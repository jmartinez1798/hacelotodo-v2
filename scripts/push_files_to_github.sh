#!/usr/bin/env bash
set -euo pipefail

: "${GITHUB_USER:?Falta GITHUB_USER}"
: "${GITHUB_TOKEN:?Falta GITHUB_TOKEN}"
: "${REPO_NAME:?Falta REPO_NAME}"

echo "🚀 Subiendo archivos a GitHub usando la API..."

# Función para crear/actualizar archivo en GitHub
upload_file() {
    local file_path="$1"
    local content_b64=$(base64 -w 0 "$file_path")
    local api_path="${file_path//.\//}"
    
    echo "📄 Subiendo: $file_path"
    
    curl -s -H "Authorization: token $GITHUB_TOKEN" \
         -H "Content-Type: application/json" \
         -X PUT \
         -d "{\"message\":\"Add $file_path\",\"content\":\"$content_b64\"}" \
         "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME/contents/$api_path" > /dev/null
}

# Crear README principal
cat > README.md << 'EOF'
# Hacelotodo.com - Marketplace de Servicios

Plataforma completa de marketplace que conecta clientes con profesionales verificados en Puerto Rico.

## 🚀 Características

- **Frontend React** con TypeScript y componentes modernos
- **Backend Express** con optimizaciones de rendimiento  
- **Páginas de perfil** con sistema de reservas
- **Páginas de categoría** con SEO optimizado
- **Sincronización automática** Replit ↔ GitHub
- **Branding profesional** integrado

## 🔧 Tecnologías

- React 18 + TypeScript
- Express.js + Node.js
- Tailwind CSS + shadcn/ui
- Drizzle ORM + PostgreSQL
- Vite + Wouter

## 📱 Categorías de Servicios

- 🏠 Hogar y Mantenimiento
- 💄 Belleza y Cuidado Personal  
- 💻 Tecnología y Reparaciones
- 🎉 Eventos y Celebraciones
- 🐕 Mascotas y Cuidado Animal
- 💪 Fitness y Bienestar

## 🌎 Localización Puerto Rico

- Ciudades: San Juan, Bayamón, Carolina, Ponce, Caguas
- Moneda: USD ($)
- SEO optimizado para mercado local

## 🚀 Despliegue

Optimizado para Replit con build automático y serving estático.

## 📋 Sincronización

Ver `README-SYNC.md` para configuración de sync automático entre Replit y GitHub.
EOF

# Subir archivos principales
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.yml" -o -name "*.yaml" \) \
     ! -path "./node_modules/*" \
     ! -path "./.git/*" \
     ! -path "./dist/*" \
     ! -name "package-lock.json" | head -50 | while read file; do
    upload_file "$file"
done

echo "✅ Archivos subidos a https://github.com/$GITHUB_USER/$REPO_NAME"