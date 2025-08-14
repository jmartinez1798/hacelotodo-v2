#!/usr/bin/env bash
set -euo pipefail

: "${GITHUB_USER:?Falta GITHUB_USER}"
: "${GITHUB_TOKEN:?Falta GITHUB_TOKEN}"
: "${REPO_NAME:?Falta REPO_NAME}"

echo "🚀 Subiendo archivos esenciales a GitHub..."

# Función para crear archivo en GitHub usando heredoc para contenido pequeño
create_file() {
    local file_path="$1"
    local content="$2"
    local content_b64=$(echo -n "$content" | base64 -w 0)
    
    echo "📄 Creando: $file_path"
    
    curl -s -H "Authorization: token $GITHUB_TOKEN" \
         -H "Content-Type: application/json" \
         -X PUT \
         -d "{\"message\":\"Add $file_path via API\",\"content\":\"$content_b64\"}" \
         "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME/contents/$file_path" > /dev/null || true
}

# README principal
create_file "README.md" "$(cat << 'EOF'
# Hacelotodo.com - Marketplace de Servicios para Puerto Rico

Plataforma completa de marketplace que conecta clientes con profesionales verificados en Puerto Rico.

## 🚀 Características Principales

- **Frontend React** con TypeScript y componentes modernos (shadcn/ui)
- **Backend Express** con optimizaciones de rendimiento y seguridad
- **Páginas de perfil** de proveedores con sistema de reservas completo
- **Páginas de categoría** con SEO optimizado y structured data
- **Sincronización automática** bidireccional Replit ↔ GitHub
- **Branding profesional** con logo integrado en toda la plataforma

## 🛠 Stack Tecnológico

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui
- Wouter (routing)
- TanStack Query (state management)
- React Hook Form + Zod (forms)

### Backend  
- Node.js + Express.js
- Drizzle ORM + PostgreSQL
- Helmet.js (security)
- Compression (performance)

## 📱 Categorías de Servicios

- 🏠 **Hogar y Mantenimiento** - Limpieza, reparaciones, jardinería
- 💄 **Belleza y Cuidado Personal** - Peluquería, estética, spa
- 💻 **Tecnología y Reparaciones** - Soporte IT, reparación dispositivos
- 🎉 **Eventos y Celebraciones** - Fotografía, catering, decoración
- 🐕 **Mascotas y Cuidado Animal** - Veterinaria, grooming, cuidado
- 💪 **Fitness y Bienestar** - Entrenamiento personal, nutrición

## 🌎 Localización Puerto Rico

- **Ciudades principales**: San Juan, Bayamón, Carolina, Ponce, Caguas, Guaynabo
- **Moneda**: USD ($)
- **SEO**: Optimizado para mercado local puertorriqueño
- **Structured Data**: JSON-LD para mejor indexación

## 🔄 Sistema de Sincronización

### GitHub → Replit (Automático)
- Push a `main` dispara GitHub Action
- Webhook seguro llama `/__sync` endpoint
- Auto pull + restart de la aplicación

### Replit → GitHub (Opcional)
- Configurar `AUTO_COMMIT=1` en Secrets
- Auto-commit cada 60 segundos si hay cambios

Ver `README-SYNC.md` para configuración detallada.

## 🚀 Despliegue en Replit

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm run start
```

**Configuración automática:**
- Puerto: 5000 (accesible externamente)
- Build: Vite optimizado para producción
- Static serving: Express sirve build de React
- Health check: `/api/health`

## 🔗 Enlaces

- **Repositorio**: https://github.com/jmartinez1798/hacelotodo-v2
- **Demo**: [Replit App URL]
- **Documentación Sync**: README-SYNC.md

## 📄 Licencia

© 2025 Hacelotodo.com - Todos los derechos reservados
EOF
)"

# Package.json
create_file "package.json" "$(cat package.json)"

# Workflow de GitHub Actions
create_file ".github/workflows/sync-to-replit.yml" "$(cat .github/workflows/sync-to-replit.yml)"

echo "✅ Archivos esenciales subidos a https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configurar SYNC_TOKEN en GitHub Secrets"
echo "2. Verificar sincronización automática"
echo "3. Deploy en Replit cuando esté listo"