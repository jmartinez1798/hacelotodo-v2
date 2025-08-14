#!/usr/bin/env bash
set -euo pipefail

# Lanza el server en background
npm run dev &
SERVER_PID=$!

# Lanza autopush (si AUTO_COMMIT=1)
bash scripts/auto_push.sh &

# Esperar al servidor principal
wait $SERVER_PID