#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Configurando sincronización Replit ↔ GitHub..."

# Verificar variables requeridas
: "${GITHUB_USER:?❌ Falta GITHUB_USER en Secrets}"
: "${GITHUB_TOKEN:?❌ Falta GITHUB_TOKEN en Secrets}"
: "${REPO_NAME:?❌ Falta REPO_NAME en Secrets}"
: "${SYNC_TOKEN:?❌ Falta SYNC_TOKEN en Secrets}"

echo "✅ Variables de entorno configuradas:"
echo "   - GITHUB_USER: $GITHUB_USER"
echo "   - REPO_NAME: $REPO_NAME"
echo "   - SYNC_TOKEN: [configurado]"

# Ejecutar push inicial
echo ""
echo "🚀 Ejecutando push inicial..."
bash scripts/link_and_push.sh

echo ""
echo "📋 Próximos pasos:"
echo "1. Ve a https://github.com/$GITHUB_USER/$REPO_NAME/settings/secrets/actions"
echo "2. Añade secret: SYNC_TOKEN con el mismo valor que en Replit"
echo "3. La sincronización GitHub → Replit estará activa"
echo ""
echo "💡 Para activar auto-sync Replit → GitHub (opcional):"
echo "   Añade en Secrets: AUTO_COMMIT=1"