#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1090
  . "$NVM_DIR/nvm.sh"
fi

if ! command -v firebase >/dev/null 2>&1; then
  echo "firebase CLI が見つかりません。"
  exit 1
fi

echo "Deploying Gemini relay function..."
firebase deploy --only functions:chat --project eeeemo-aischool

echo
echo "If deploy succeeded, open Firebase Console > Functions > chat"
echo "Copy trigger URL and paste it to: AIチャット > AI連携設定 > Gemini Relay URL"
