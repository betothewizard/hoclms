import * as Realm from "realm-web";
import * as utils from "./utils.ts";

interface Bindings {
  ATLAS_APPID: string;
}

type Document = globalThis.Realm.Services.MongoDB.Document;

interface Question extends Document {
  owner_id: string;
  type: number;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

let App: Realm.App;
const ObjectId = Realm.BSON.ObjectID;

const worker: ExportedHandler<Bindings> = {
  async fetch(req, env) {
    const url = new URL(req.url);
    App = App || new Realm.App(env.ATLAS_APPID);

    const method = req.method;
    const path = url.pathname.replace(/[/]$/, "");
    const questionID = url.searchParams.get("id") || "";

    if (path !== "/api/questions") {
      return utils.toError(
        `Unknown '${path}' URL; try '/api/questions' instead.`,
        404
      );
    }

    const token = req.headers.get("authorization");
    if (!token)
      return utils.toError(
        `Missing 'authorization' header; try to add the header 'authorization: ATLAS_APP_API_KEY'.`,
        401
      );

    try {
      const credentials = Realm.Credentials.apiKey(token);
      var user = await App.logIn(credentials);
      var client = user.mongoClient("mongodb-atlas");
    } catch (err) {
      return utils.toError("Error with authentication.", 500);
    }

    const collection = client
      .db("cloudflare")
      .collection<Question>("questions");

    try {
      if (method === "GET") {
        if (questionID) {
          // GET /api/questions?id=XXX
          return utils.reply(
            await collection.findOne({
              _id: new ObjectId(questionID),
            })
          );
        }

        // GET /api/questions
        return utils.reply(await collection.find());
      }

      // POST /api/questions
      if (method === "POST") {
        const request = await req.json();
        if (Array.isArray(request)) {
          const items = [];
          request.map((item) => {
            item["owner_id"] = user.id;
            items.push(item);
          });
          return utils.reply(await collection.insertMany(items));
        } else {
          const { type, question, correct_answer, incorrect_answers } = request;
          return utils.reply(
            await collection.insertOne({
              owner_id: user.id,
              type: type,
              question: question,
              correct_answer: correct_answer,
              incorrect_answers: incorrect_answers,
            })
          );
        }
      }

      // PATCH /api/questions?id=XXX&done=true
      // if (method === 'PATCH') {
      //     return utils.reply(
      //         await collection.updateOne({
      //             _id: new ObjectId(questionID)
      //         }, {
      //             $set: {
      //                 done: url.searchParams.get('done') === 'true'
      //             }
      //         })
      //     );
      // }

      // DELETE /api/questions?id=XXX
      if (method === "DELETE") {
        return utils.reply(
          await collection.deleteOne({
            _id: new ObjectId(questionID),
          })
        );
      }

      return utils.toError("Method not allowed.", 405);
    } catch (err) {
      const msg = (err as Error).message || "Error with query.";
      return utils.toError(msg, 500);
    }
  },
};

export default worker;
