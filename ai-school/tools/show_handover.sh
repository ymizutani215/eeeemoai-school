#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "=== AI School Handover Files ==="
ls -1 HANDOVER_*.md 2>/dev/null || true
echo

latest="$(ls -1t HANDOVER_*.md 2>/dev/null | head -n 1 || true)"
if [ -z "${latest:-}" ]; then
  echo "No HANDOVER_*.md found."
  exit 1
fi

echo "=== Latest: ${latest} ==="
cat "$latest"

