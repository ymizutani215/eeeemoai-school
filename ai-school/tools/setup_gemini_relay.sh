#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1090
  . "$NVM_DIR/nvm.sh"
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm が見つかりません。Node.js を先にインストールしてください。"
  exit 1
fi

echo "Installing Functions dependencies..."
npm --prefix functions install

echo "Done. Next: set GEMINI_API_KEY secret and deploy."
echo "  firebase functions:secrets:set GEMINI_API_KEY --project eeeemo-aischool"
echo "  bash tools/deploy_gemini_relay.sh"
