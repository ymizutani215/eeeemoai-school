#!/usr/bin/env bash
set -euo pipefail

RELAY_URL="${1:-http://127.0.0.1:8788/chatwork}"
ROOM_ID="${2:-123456789}"

payload=$(cat <<JSON
{
  "provider": "chatwork",
  "roomId": "${ROOM_ID}",
  "message": "[info][title]AI School 連携テスト[/title]relay test from script[/info]"
}
JSON
)

echo "POST -> ${RELAY_URL}"
http_code=$(curl -sS -o /tmp/relay-response.json -w "%{http_code}" \
  -X POST "${RELAY_URL}" \
  -H 'Content-Type: application/json' \
  -d "${payload}")

echo "HTTP ${http_code}"
cat /tmp/relay-response.json
