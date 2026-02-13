/**
 * Chatwork Relay example (Cloudflare Workers / Node style)
 *
 * Required env vars:
 * - CHATWORK_API_TOKEN
 *
 * Request body:
 * {
 *   "provider": "chatwork",
 *   "roomId": "123456789",
 *   "message": "[info]...[/info]"
 * }
 */

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    if (body.provider !== "chatwork" || !body.roomId || !body.message) {
      return new Response("Missing required fields", { status: 400 });
    }

    const apiToken = env.CHATWORK_API_TOKEN;
    if (!apiToken) {
      return new Response("Missing CHATWORK_API_TOKEN", { status: 500 });
    }

    const endpoint = `https://api.chatwork.com/v2/rooms/${encodeURIComponent(body.roomId)}/messages`;
    const form = new URLSearchParams();
    form.set("body", body.message);

    const cwRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-ChatWorkToken": apiToken,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: form.toString()
    });

    if (!cwRes.ok) {
      const text = await cwRes.text();
      return new Response(`Chatwork API error: ${text}`, { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};
