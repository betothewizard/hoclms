import type { ExportedHandler, KVNamespace } from "@cloudflare/workers-types";

interface Env {
  hoclms: KVNamespace;
}

const ALLOWED_ORIGIN = "*"; // Consider restricting this to your specific origin in production

export default {
  async fetch(request: Request, env: Env, ctx): Promise<Response> {
    // Set CORS headers for all responses
    const corsHeaders = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/api/questions" && request.method === "GET") {
      const pageSize = 10;

      try {
        if (!env.hoclms) {
          return new Response("KV Namespace not found.", {
            status: 500,
            headers: corsHeaders,
          });
        }

        const allQuestions = await env.hoclms.get("questions");
        if (!allQuestions) {
          return new Response("Questions not found", {
            status: 404,
            headers: corsHeaders,
          });
        }

        const parsedQuestions = JSON.parse(allQuestions);
        const page = +(url.searchParams.get("page") || "0");
        const totalPages = Math.ceil(parsedQuestions.length / pageSize);

        if (page < 0 || page >= totalPages) {
          return new Response("Page not found", {
            status: 404,
            headers: corsHeaders,
          });
        }

        const start = page * pageSize;
        const end = start + pageSize;
        const questions = parsedQuestions.slice(start, end);

        return new Response(
          JSON.stringify({ questions, meta: { page, totalPages } }),
          {
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          },
        );
      } catch (e) {
        return new Response(e.toString(), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    if (path === "/api/submissions" && request.method === "POST") {
      try {
        const submission = await request.json();
        if (!submission) {
          return new Response("Missing body.", {
            status: 400,
            headers: corsHeaders,
          });
        }

        const submissions = await env.hoclms.get("submissions");
        if (!submissions) {
          return new Response("Submissions not found", {
            status: 404,
            headers: corsHeaders,
          });
        }

        const parsedSubmissions = JSON.parse(submissions);
        submission.forEach((element) => {
          parsedSubmissions[element.id][element.selectedAnswerIndex]++;
        });

        await env.hoclms.put("submissions", JSON.stringify(parsedSubmissions));

        return new Response(JSON.stringify({ success: true }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        return new Response(e.toString(), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    return new Response("Not found", { status: 404, headers: corsHeaders });
  },
} satisfies ExportedHandler<Env>;
