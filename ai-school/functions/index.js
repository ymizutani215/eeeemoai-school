/**
 * Firebase Functions (2nd gen) example for Gemini relay.
 *
 * Setup (example):
 * 1) functions project with firebase-admin/firebase-functions installed
 * 2) set secret: firebase functions:secrets:set GEMINI_API_KEY
 * 3) deploy: firebase deploy --only functions
 * 4) set app relay URL to this endpoint
 */

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

const geminiKey = defineSecret("GEMINI_API_KEY");

exports.chat = onRequest({ secrets: [geminiKey], cors: true }, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  try {
    const body = req.body || {};
    const query = String(body.query || "").trim();
    const model = String(body.model || "gemini-2.5-flash").trim();
    const context = Array.isArray(body.context) ? body.context : [];
    const recent = Array.isArray(body.recent) ? body.recent : [];

    if (!query) {
      res.status(400).json({ error: "query_required" });
      return;
    }

    const contextText = context
      .map((c, i) => `${i + 1}. ${c.summary || c.text || ""}`)
      .join("\n");
    const recentText = recent
      .map((m) => `${m.role === "user" ? "ユーザー" : "AI"}: ${m.text || ""}`)
      .join("\n");

    const prompt = [
      "あなたは社内AIスクールのアシスタントです。回答は簡潔かつ実務的に。",
      "出力は日本語。機密情報や推測を断定しない。",
      "社内学習の質問を優先するが、一般質問にも自然に回答してよい。",
      "一般質問を拒否しない。わからない場合は不確実性を明示して実用的な次アクションを示す。",
      "天気質問では、リアルタイム観測値は持たない前提で、場所確認と確認方法を短く案内する。",
      "一般質問の場合は、最後に1文だけ社内AI活用へつながる提案を添える。",
      "--- 参考コンテキスト ---",
      contextText || "(なし)",
      "--- 直近会話 ---",
      recentText || "(なし)",
      "--- ユーザー質問 ---",
      query
    ].join("\n");

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(geminiKey.value())}`;
    const apiRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 700
        }
      })
    });

    if (!apiRes.ok) {
      const t = await apiRes.text();
      res.status(502).json({ error: "gemini_api_error", detail: t.slice(0, 800) });
      return;
    }

    const data = await apiRes.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "回答を生成できませんでした。";

    res.json({
      answer,
      sources: context.slice(0, 4).map((c) => c.source).filter(Boolean)
    });
  } catch (e) {
    res.status(500).json({ error: "internal_error", detail: String(e && e.message ? e.message : e) });
  }
});
