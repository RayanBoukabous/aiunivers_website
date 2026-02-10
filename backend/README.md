# AIUnivers Backend

API Django REST optimisée pour les solutions AIUnivers. Multilingue (AR, FR, EN, ES, DE) avec système de cache pour un rendu ultra-rapide.

## Démarrage rapide

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Endpoints API

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/solutions/` | Liste des solutions |
| GET | `/api/solutions/<slug>/` | Détail d'une solution |
| GET | `/api/solutions/preload/` | Précharge le cache (warm-up) |

## Structure Solutions

- **Nom** : ar, fr, en, es, de
- **Description** : ar, fr, en, es, de
- **Images** : 1 cover + plusieurs demo
- **Vidéo** : 1 demo video
- **Avantages** : listes JSON par langue
- **Principales fonctions** : listes JSON par langue
- **Use cases** : listes JSON par langue

## Cache & Performance

- **Cache** : LocMem par défaut (dev), Redis en prod avec `REDIS_URL`
- **Invalidation** : Automatique via signals à chaque modification
- **Warm-up** : `python manage.py warmup_cache` ou `GET /api/solutions/preload/`

## Configuration

| Variable | Description |
|----------|-------------|
| `USE_POSTGRES=1` | Activer PostgreSQL |
| `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` | Config PostgreSQL |
| `REDIS_URL` | URL Redis (ex: `redis://localhost:6379/1`) |
| `DJANGO_SECRET_KEY` | Clé secrète (production) |

- **Admin** : `/admin/`
- **Docs API** : `/api/docs/` (Swagger) en mode DEBUG
