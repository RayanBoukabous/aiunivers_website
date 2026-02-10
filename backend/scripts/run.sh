#!/bin/bash
# Script de démarrage AIUnivers Backend
set -e
cd "$(dirname "$0")/.."

# Activer venv si présent
if [ -d "venv" ]; then
  source venv/bin/activate
fi

# Migrations
python manage.py migrate --noinput

# Warm-up cache (optionnel)
python manage.py warmup_cache 2>/dev/null || true

# Lancer le serveur
exec python manage.py runserver "${1:-8000}"
