#!/usr/bin/env bash
set -euo pipefail

: "${GITHUB_USER:?Falta GITHUB_USER}"
: "${GITHUB_TOKEN:?Falta GITHUB_TOKEN}"
: "${REPO_NAME:?Falta REPO_NAME}"

echo "🚀 Subiendo TODOS los archivos del proyecto a GitHub..."

# Función para crear archivo en GitHub
upload_file() {
    local file_path="$1"
    if [ -f "$file_path" ]; then
        echo "📄 Subiendo: $file_path"
        local content_b64=$(base64 -w 0 "$file_path")
        local api_path="${file_path//.\//}"
        
        curl -s -H "Authorization: token $GITHUB_TOKEN" \
             -H "Content-Type: application/json" \
             -X PUT \
             -d "{\"message\":\"Add $file_path\",\"content\":\"$content_b64\"}" \
             "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME/contents/$api_path" > /dev/null || true
    fi
}

# Función para crear directorio (estructura en GitHub)
create_directory() {
    local dir_path="$1"
    echo "📁 Creando directorio: $dir_path"
    # GitHub crea directorios automáticamente cuando subes archivos
}

echo "📦 Subiendo archivos principales..."

# Archivos de configuración del proyecto
upload_file "package.json"
upload_file "tsconfig.json"
upload_file "vite.config.ts"
upload_file "tailwind.config.ts"
upload_file "postcss.config.js"
upload_file "components.json"
upload_file "drizzle.config.ts"
upload_file ".gitignore"
upload_file "README.md"
upload_file "README-SYNC.md"
upload_file "DEPLOY.md"
upload_file "replit.md"

echo "📂 Subiendo carpeta client/..."
find client/ -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.json" \) | while read file; do
    upload_file "$file"
done

echo "🖥 Subiendo carpeta server/..."
find server/ -type f \( -name "*.ts" -o -name "*.js" -o -name "*.json" \) | while read file; do
    upload_file "$file"
done

echo "🔗 Subiendo carpeta shared/..."
find shared/ -type f \( -name "*.ts" -o -name "*.js" \) | while read file; do
    upload_file "$file"
done

echo "⚙️ Subiendo carpeta scripts/..."
find scripts/ -type f \( -name "*.sh" -o -name "*.js" -o -name "*.ts" \) | while read file; do
    upload_file "$file"
done

echo "🔄 Subiendo workflows de GitHub..."
find .github/ -type f \( -name "*.yml" -o -name "*.yaml" \) | while read file; do
    upload_file "$file"
done

echo "✅ TODOS los archivos han sido subidos a https://github.com/$GITHUB_USER/$REPO_NAME"
echo "🔍 Revisa el repositorio para confirmar que todo está correcto"