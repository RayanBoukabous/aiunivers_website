"""
Signals pour invalidation du cache des départements.
"""
from django.db.models.signals import post_save, post_delete, m2m_changed
from django.dispatch import receiver

from .models import Departement
from .cache_utils import invalidate_departement_cache


@receiver([post_save, post_delete], sender=Departement)
def invalidate_departement_on_change(sender, instance, **kwargs):
    invalidate_departement_cache(instance.slug)


@receiver(m2m_changed, sender=Departement.solutions.through)
def invalidate_departement_when_solutions_change(sender, instance, action, **kwargs):
    """Quand on ajoute/retire des solutions à un département, invalider son cache."""
    if action in ('post_add', 'post_remove', 'post_clear'):
        invalidate_departement_cache(instance.slug)
