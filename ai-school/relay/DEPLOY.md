# Chatwork Relay Deploy (Cloudflare Workers)

## 1) Install Wrangler
```bash
npm i -g wrangler
```

## 2) Login
```bash
wrangler login
```

## 3) Move to relay directory
```bash
cd "/Users/yukihikomizutani/Documents/New project/ai-school/relay"
```

## 4) Set Chatwork API token (secret)
```bash
wrangler secret put CHATWORK_API_TOKEN
```

## 5) (Optional) Edit allowed origin
Edit `wrangler.toml`:
```toml
[vars]
ALLOWED_ORIGIN = "http://localhost:8000"
```
Set to your actual app origin in production.

## 6) Deploy
```bash
wrangler deploy
```

After deploy, copy the Worker URL (e.g. `https://eeeemo-chatwork-relay.<subdomain>.workers.dev`).

## 7) App setting
In admin screen:
- Webhook Relay URL: deployed Worker URL
- Chatwork Room ID: target room id

Then click:
- `連携設定を保存`
- `テスト通知送信`

## 8) Troubleshooting
- 401 / token error: re-run `wrangler secret put CHATWORK_API_TOKEN`
- CORS error: `ALLOWED_ORIGIN` mismatch
- 502: Chatwork API response error (check room ID / token scope)
