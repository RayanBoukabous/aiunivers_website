"""
Utilitaires de cache pour l'API Solutions.
TTL optimisés pour un rendu ultra-rapide.
"""
from django.core.cache import cache
from django.conf import settings

# TTL en secondes
CACHE_TTL_LIST = 300      # 5 min - liste des solutions
CACHE_TTL_DETAIL = 600    # 10 min - détail d'une solution
CACHE_TTL_ALL = 600       # 10 min - toutes les solutions (pour preload)

CACHE_KEY_PREFIX = 'solutions'
CACHE_VERSION = 1


def _key(*parts):
    return f"{CACHE_KEY_PREFIX}:v{CACHE_VERSION}:{':'.join(str(p) for p in parts)}"


def get_solutions_list_key():
    return _key('list')


def get_solution_detail_key(slug):
    return _key('detail', slug)


def get_all_solutions_key():
    return _key('all')


def invalidate_solution_cache(slug=None):
    """
    Invalide le cache lors des modifications.
    Appelé depuis les signals.
    """
    if slug:
        cache.delete(get_solution_detail_key(slug))
    cache.delete(get_solutions_list_key())
    cache.delete(get_all_solutions_key())
