interface Env {
  hoclms: KVNamespace;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers,
      });
    }

    try {
      const value = await env.hoclms.get("questions");
      if (value === null) {
        return new Response("Value not found", { status: 404, headers });
      }
      return new Response(value, { headers });
    } catch (e) {
      return new Response(e.toString(), { status: 500, headers });
    }
  }
} satisfies ExportedHandler<Env>;
