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
  echo "firebase CLI が見つかりません。先に Node.js / firebase-tools を導入してください。"
  exit 1
fi

echo "Deploy target: eeeemo-aischool"
firebase deploy --only hosting --project eeeemo-aischool
