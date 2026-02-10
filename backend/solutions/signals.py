"""
Signals pour invalidation automatique du cache.
"""
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Solution, SolutionDemoImage
from .cache_utils import invalidate_solution_cache


@receiver([post_save, post_delete], sender=Solution)
def invalidate_solution_on_change(sender, instance, **kwargs):
    invalidate_solution_cache(instance.slug)
    # Invalider le cache des départements qui contiennent cette solution (M2M)
    from departements.cache_utils import invalidate_departement_cache
    for dep in instance.departements.only('slug').all():
        invalidate_departement_cache(dep.slug)


@receiver([post_save, post_delete], sender=SolutionDemoImage)
def invalidate_solution_on_demo_image_change(sender, instance, **kwargs):
    if instance.solution_id:
        invalidate_solution_cache(instance.solution.slug)
