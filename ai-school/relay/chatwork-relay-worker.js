/**
 * Chatwork relay for Cloudflare Workers.
 *
 * Env vars (wrangler secret):
 * - CHATWORK_API_TOKEN
 *
 * Optional env vars:
 * - ALLOWED_ORIGIN (e.g. http://localhost:8000)
 */

function corsHeaders(origin, allowedOrigin) {
  const allowOrigin = allowedOrigin || "*";
  const responseOrigin = allowOrigin === "*" ? "*" : (origin === allowOrigin ? allowOrigin : "null");
  return {
    "Access-Control-Allow-Origin": responseOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function json(body, status = 200, cors = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...cors
    }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env.ALLOWED_ORIGIN);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST") {
      return json({ ok: false, error: "Method Not Allowed" }, 405, cors);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: "Invalid JSON" }, 400, cors);
    }

    if (body.provider !== "chatwork" || !body.roomId || !body.message) {
      return json({ ok: false, error: "Missing required fields" }, 400, cors);
    }

    if (!env.CHATWORK_API_TOKEN) {
      return json({ ok: false, error: "Missing CHATWORK_API_TOKEN" }, 500, cors);
    }

    const endpoint = `https://api.chatwork.com/v2/rooms/${encodeURIComponent(body.roomId)}/messages`;
    const form = new URLSearchParams();
    form.set("body", body.message);

    const cwRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-ChatWorkToken": env.CHATWORK_API_TOKEN,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: form.toString()
    });

    if (!cwRes.ok) {
      const text = await cwRes.text();
      return json({ ok: false, error: "Chatwork API error", detail: text }, 502, cors);
    }

    const result = await cwRes.json().catch(() => ({}));
    return json({ ok: true, relay: "chatwork", result }, 200, cors);
  }
};
