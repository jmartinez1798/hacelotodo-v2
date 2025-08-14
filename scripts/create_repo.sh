#!/usr/bin/env bash
set -euo pipefail

# GitHub Repository Creation Script for Hacelotodo.com
# Requires environment variables:
#   GITHUB_USER  -> your GitHub username (e.g., julianmartinez)
#   GITHUB_TOKEN -> GitHub token with repo scope
#   REPO_NAME    -> repository name (e.g., hacelotodo)
#
# Usage: 
#   export GITHUB_USER="yourusername"
#   export GITHUB_TOKEN="your_token_here"
#   export REPO_NAME="hacelotodo"
#   bash scripts/create_repo.sh

echo "🚀 Creating GitHub repository for Hacelotodo.com..."

if [[ -z "${GITHUB_USER:-}" || -z "${GITHUB_TOKEN:-}" || -z "${REPO_NAME:-}" ]]; then
  echo "❌ Error: Missing required environment variables"
  echo "Please set: GITHUB_USER, GITHUB_TOKEN, REPO_NAME"
  exit 1
fi

API="https://api.github.com"

echo "📡 Creating repository on GitHub..."
# Create repository (ignore if already exists)
CREATE_RESPONSE=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
  -d "{\"name\":\"${REPO_NAME}\",\"description\":\"Hacelotodo.com - Marketplace de servicios para Puerto Rico\",\"private\":false,\"has_issues\":true,\"has_wiki\":false}" \
  "${API}/user/repos" || true)

echo "📁 Initializing local git repository..."
# Initialize git if not already initialized
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git init
fi

# Configure git if needed
git config --get user.name >/dev/null || git config user.name "${GITHUB_USER}"
git config --get user.email >/dev/null || git config user.email "${GITHUB_USER}@users.noreply.github.com"

echo "📝 Adding files to git..."
git add .
git commit -m "🎉 Initial commit: Hacelotodo.com full-stack marketplace

- React frontend with TypeScript
- Express backend with SEO optimizations
- Provider profiles and category pages
- Puerto Rico localization (USD pricing, local cities)
- Performance optimizations (compression, security headers)
- SEO infrastructure (sitemap.xml, robots.txt, JSON-LD)
- Ready for Replit deployment" || echo "ℹ️  No changes to commit"

git branch -M main

echo "🔗 Setting up remote repository..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Repository successfully created and pushed!"
echo "🌐 View your repository: https://github.com/${GITHUB_USER}/${REPO_NAME}"
echo ""
echo "Next steps:"
echo "1. Clone with: git clone https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
echo "2. Edit with Cursor AI or any IDE"
echo "3. Continue development with ChatGPT 5 Pro"
echo ""