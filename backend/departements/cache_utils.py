"""
Utilitaires de cache pour l'API Départements.
"""
from django.core.cache import cache

CACHE_KEY_PREFIX = 'departements'
CACHE_TTL_LIST = 300   # 5 min
CACHE_TTL_DETAIL = 600  # 10 min


def get_departements_list_key():
    return f'{CACHE_KEY_PREFIX}:list'


def get_departement_detail_key(slug):
    return f'{CACHE_KEY_PREFIX}:detail:{slug}'


def invalidate_departement_cache(slug=None):
    if slug:
        cache.delete(get_departement_detail_key(slug))
    cache.delete(get_departements_list_key())
