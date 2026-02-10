"""
Utilitaires de cache pour l'API Secteurs.
"""
CACHE_TTL_LIST = 300
CACHE_TTL_DETAIL = 600
CACHE_KEY_PREFIX = 'secteurs'
CACHE_VERSION = 1


def _key(*parts):
    return f"{CACHE_KEY_PREFIX}:v{CACHE_VERSION}:{':'.join(str(p) for p in parts)}"


def get_secteurs_list_key():
    return _key('list')


def get_secteur_detail_key(slug):
    return _key('detail', slug)


def invalidate_secteur_cache(slug=None):
    from django.core.cache import cache
    if slug:
        cache.delete(get_secteur_detail_key(slug))
    cache.delete(get_secteurs_list_key())

