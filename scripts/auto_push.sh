#!/usr/bin/env bash
set -euo pipefail

[[ "${AUTO_COMMIT:-0}" == "1" ]] || { echo "AUTO_COMMIT desactivado"; exit 0; }

git config user.email "${GIT_EMAIL:-bot@replit.local}"
git config user.name  "${GIT_NAME:-Replit Bot}"

while true; do
  CHANGES=$(git status --porcelain 2>/dev/null || echo "")
  if [[ -n "$CHANGES" ]]; then
    git add -A
    git commit -m "chore: autosync $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
    git push origin main || true
    echo "↑ Auto-push realizado"
  fi
  sleep 60
done