#!/bin/sh
set -e

echo "[backend] Migrations..."
python manage.py migrate --noinput

echo "[backend] Creation superuser si inexistant..."
python manage.py shell <<EOF
from django.contrib.auth import get_user_model
User = get_user_model()
email = 'contact@aiunivers.ai'
password = 'AIUNIVERS2026--/@'
if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(username=email, email=email, password=password)
    print('[backend] Superuser contact@aiunivers.ai cree')
else:
    print('[backend] Superuser existant, skip')
EOF

echo "[backend] Collectstatic..."
python manage.py collectstatic --noinput 2>/dev/null || true

echo "[backend] Warmup cache..."
python manage.py warmup_cache 2>/dev/null || true

echo "[backend] Demarrage Gunicorn..."
exec gunicorn --bind 0.0.0.0:8000 --workers 2 --threads 4 --timeout 120 aiunivers_backend.wsgi:application
