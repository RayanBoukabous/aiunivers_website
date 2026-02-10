#!/bin/bash
# Lance le backend et le frontend en local (sans Docker).
# Utilise SQLite et cache en mémoire pour le backend.

set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "=== Backend (Django) ==="
cd "$ROOT/backend"
if [ ! -d ".venv" ]; then
  echo "Création du venv..."
  python3 -m venv .venv
fi
source .venv/bin/activate
pip install -q -r requirements.txt
# Pas de USE_POSTGRES ni REDIS_URL = SQLite + cache local
export DJANGO_DEBUG=True
export ALLOWED_HOSTS=localhost,127.0.0.1
python manage.py migrate --run-syncdb 2>/dev/null || true
echo "Démarrage du backend sur http://127.0.0.1:8000"
python manage.py runserver 0.0.0.0:8000 &
BACKEND_PID=$!

echo ""
echo "=== Frontend (Next.js) ==="
cd "$ROOT/front"
export NEXT_PUBLIC_API_URL=http://localhost:8000
if [ ! -d "node_modules" ]; then
  echo "npm install..."
  npm install
fi
echo "Démarrage du frontend sur http://localhost:3000"
npm run dev &
FRONTEND_PID=$!

cleanup() {
  echo ""
  echo "Arrêt des serveurs..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
  exit 0
}
trap cleanup SIGINT SIGTERM

echo ""
echo ">>> Backend:  http://127.0.0.1:8000"
echo ">>> Frontend: http://localhost:3000"
echo ">>> Ctrl+C pour tout arrêter"
wait
