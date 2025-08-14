# Sincronización Replit ↔ GitHub

## Configuración Inicial

### 1. Variables de entorno en Replit Secrets:
```
GITHUB_USER=jmartinez1798
GITHUB_TOKEN=ghp_xxx...  # Token con permisos repo
REPO_NAME=hacelotodo-v2
SYNC_TOKEN=tu_token_secreto_largo_aleatorio  # Para proteger webhook
```

### 2. Variables opcionales para auto-push:
```
AUTO_COMMIT=1  # Activar auto-sync cada 60s
GIT_EMAIL=tu@email.com
GIT_NAME=Tu Nombre
```

## Push inicial desde Replit

En la Shell de Replit:
```bash
export GITHUB_USER="jmartinez1798"
export GITHUB_TOKEN="tu_token"
export REPO_NAME="hacelotodo-v2"
bash scripts/link_and_push.sh
```

## Configuración GitHub → Replit

1. En tu repositorio GitHub, ve a **Settings → Secrets and variables → Actions**
2. Añade un nuevo secret:
   - **Name**: `SYNC_TOKEN`
   - **Value**: El mismo valor que configuraste en Replit

## Flujos de Sincronización

### A) GitHub → Replit (Automático)
- Cada push a `main` dispara el workflow `.github/workflows/sync-to-replit.yml`
- Llama al endpoint `/__sync` en tu app de Replit
- Replit hace `git pull` y reinicia automáticamente

### B) Replit → GitHub (Opcional)
- Si `AUTO_COMMIT=1`, cada 60 segundos verifica cambios
- Auto-commit y push de cambios detectados
- Útil para desarrollo continuo en Replit

## Comandos útiles

```bash
# Subir cambios manualmente
bash scripts/link_and_push.sh

# Activar auto-sync en desarrollo
export AUTO_COMMIT=1
bash scripts/dev_with_autopush.sh

# Solo servidor (sin auto-sync)
npm run dev
```

## Endpoints

- `POST /__sync?token=XXX` - Sincronización desde GitHub (protegido)
- Requiere header `x-sync-token` o query param `token`

## Seguridad

- El endpoint `/__sync` está protegido por `SYNC_TOKEN`
- Solo GitHub Actions puede disparar la sincronización
- Reinicio automático del proceso después del pull