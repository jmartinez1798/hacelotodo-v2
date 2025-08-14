#!/usr/bin/env bash
set -euo pipefail

: "${GITHUB_USER:?Falta GITHUB_USER}"
: "${GITHUB_TOKEN:?Falta GITHUB_TOKEN}"
: "${REPO_NAME:?Falta REPO_NAME}"

REPO_URL="https://$GITHUB_USER:${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git"

git config user.email "${GIT_EMAIL:-bot@replit.local}"
git config user.name  "${GIT_NAME:-Replit Bot}"

git init
git add .
git commit -m "init: push desde Replit" || true
git branch -M main

# resetear origen si existe
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"
git push -u origin main

echo "✅ Código subido a https://github.com/${GITHUB_USER}/${REPO_NAME}"