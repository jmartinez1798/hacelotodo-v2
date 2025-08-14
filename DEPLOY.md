# 🚀 Guía de Despliegue - Hacelotodo.com

## 📋 Sistema de Sincronización Automática

### ✅ Estado Actual
- **Repositorio GitHub**: https://github.com/jmartinez1798/hacelotodo-v2
- **Endpoint de Sync**: `POST /__sync` (protegido por SYNC_TOKEN)
- **GitHub Actions**: Configurado para sincronización automática
- **Scripts**: Listos para push manual y auto-sync

### 🔧 Variables Configuradas en Replit
```
✅ GITHUB_TOKEN  - Token de acceso a GitHub
✅ SYNC_TOKEN    - Token de seguridad para webhook
```

### 📝 Próximos Pasos para Activar Sync Completo

#### 1. Configurar Secret en GitHub
```bash
# Ve a: https://github.com/jmartinez1798/hacelotodo-v2/settings/secrets/actions
# Añade: SYNC_TOKEN = [mismo valor que en Replit]
```

#### 2. Flujos de Sincronización

**A) GitHub → Replit** *(Automático)*
- Push a `main` → GitHub Action → Endpoint `/__sync` → Git pull + Restart

**B) Replit → GitHub** *(Opcional)*
- Configurar `AUTO_COMMIT=1` en Secrets de Replit
- Auto-push cada 60 segundos si hay cambios

### 🎯 Testing de Sincronización

#### Probar GitHub → Replit:
1. Hacer un cambio en GitHub (ej: editar README.md)
2. Commit a `main`
3. Verificar que Replit se actualiza automáticamente

#### Probar Replit → GitHub:
1. Activar `AUTO_COMMIT=1` en Secrets
2. Hacer cambio en Replit
3. Esperar 60s, verificar push automático

### 🌐 Despliegue en Replit

El proyecto está optimizado para Replit Deployments:

```bash
# Build de producción
npm run build

# Servidor de producción  
npm run start
```

**Configuración automática:**
- Build: `npm run build`
- Start: `npm run start` 
- Puerto: 5000 (configurado en .replit)
- Dominio: `*.replit.app`

### 📊 Endpoints del Sistema

- `/` - Aplicación principal
- `/api/*` - API REST
- `/__sync` - Webhook de sincronización (protegido)
- `/api/health` - Health check
- `/sitemap.xml` - SEO sitemap
- `/robots.txt` - SEO robots

### 🔐 Seguridad

- Headers de seguridad con Helmet.js
- Compresión gzip habilitada
- Rate limiting en endpoints sensibles
- Token-based webhook protection

### 📈 Performance

- Vite build optimizado
- Lazy loading de componentes
- Caching headers para assets estáticos
- Compresión automática de responses

## 🎉 ¡Listo para Deploy!

El proyecto está completamente configurado y listo para despliegue en Replit con sincronización automática a GitHub.