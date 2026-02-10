"""
Signals pour invalidation du cache des secteurs.
"""
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Secteur
from .cache_utils import invalidate_secteur_cache


@receiver([post_save, post_delete], sender=Secteur)
def invalidate_secteur_on_change(sender, instance, **kwargs):
    invalidate_secteur_cache(instance.slug)
