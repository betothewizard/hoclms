import { ExportedHandler, Response } from "@cloudflare/workers-types";
import { KVNamespace } from "@cloudflare/workers-types";

interface Env {
  hoclms: KVNamespace;
}

const ALLOWED_ORIGIN = "https://hoclms.pages.dev";
const X_HEADER = "X-Header";

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const headers = new Headers({
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Header",
    });

    // const origin = request.headers.get("Origin");
    // const xHeader = request.headers.get(X_HEADER);
    // if (
    //   request.method === "OPTIONS" ||
    //   origin !== ALLOWED_ORIGIN ||
    //   xHeader !== X_HEADER
    // ) {
    //   return new Response(null, { headers });
    // }

    // if (request.method === "POST") {
    //   const { questions, answers } = await request.json();
    // }

    // if (request.method === "GET") {
    try {
      const value = await env.hoclms.get("questions");
      if (value === null) {
        return new Response("Value not found", { status: 404, headers });
      }
      return new Response(value, { headers });
    } catch (e) {
      return new Response(e.toString(), { status: 500, headers });
    }
    // }
  },
} satisfies ExportedHandler<Env>;
