# AIUnivers - Docker

## Démarrage rapide

```bash
# À la racine du projet - lance front + backend
./up.sh
# ou
make up

# En arrière-plan
make up-d
```

**Superuser auto-créé** : `contact@aiunivers.ai` / `AIUNIVERS2026--/@`

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin: http://localhost:8000/admin/

## Mode développement (hot-reload)

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

## Variables d'environnement

Créer un fichier `.env` à la racine :

```
DJANGO_SECRET_KEY=change-me-in-production
DJANGO_DEBUG=False
DB_PASSWORD=postgres
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Créer un superutilisateur

```bash
docker compose exec backend python manage.py createsuperuser
```

## Services

| Service  | Port | Description      |
|----------|------|------------------|
| frontend | 3000 | Next.js          |
| backend  | 8000 | Django + Gunicorn|
| postgres | 5432 | PostgreSQL 16    |
| redis    | 6379 | Redis 7          |
