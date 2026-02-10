"""
Commande pour précharger le cache des solutions et départements.
Exécuter au déploiement ou via cron pour un rendu instantané.
"""
from django.core.management.base import BaseCommand
from django.core.cache import cache
from solutions.models import Solution
from solutions.serializers import SolutionListSerializer, SolutionDetailSerializer
from solutions.cache_utils import (
    get_solutions_list_key,
    get_solution_detail_key,
    get_all_solutions_key,
    CACHE_TTL_LIST,
    CACHE_TTL_DETAIL,
    CACHE_TTL_ALL,
)
from departements.models import Departement
from departements.serializers import DepartementListSerializer, DepartementDetailSerializer
from departements.cache_utils import (
    get_departements_list_key,
    get_departement_detail_key,
    CACHE_TTL_LIST as DEP_CACHE_TTL_LIST,
    CACHE_TTL_DETAIL as DEP_CACHE_TTL_DETAIL,
)


class Command(BaseCommand):
    help = 'Précharge le cache des solutions et départements pour un rendu ultra-rapide'

    def handle(self, *args, **options):
        # Solutions
        queryset = Solution.objects.filter(is_active=True).order_by('order', 'slug')
        queryset = queryset.prefetch_related('demo_images')

        list_data = SolutionListSerializer(queryset, many=True).data
        cache.set(get_solutions_list_key(), list_data, CACHE_TTL_LIST)
        self.stdout.write(self.style.SUCCESS(f'Cache liste: {len(list_data)} solutions'))

        for solution in queryset:
            detail_data = SolutionDetailSerializer(solution).data
            cache.set(get_solution_detail_key(solution.slug), detail_data, CACHE_TTL_DETAIL)
        cache.set(get_all_solutions_key(), list_data, CACHE_TTL_ALL)
        self.stdout.write(self.style.SUCCESS(f'Cache detail: {queryset.count()} solutions'))

        # Départements
        dept_qs = Departement.objects.filter(is_active=True).prefetch_related(
            'solutions', 'solutions__demo_images'
        ).order_by('order', 'slug')
        dept_list = DepartementListSerializer(dept_qs, many=True).data
        cache.set(get_departements_list_key(), dept_list, DEP_CACHE_TTL_LIST)
        for dept in dept_qs:
            detail_data = DepartementDetailSerializer(dept).data
            cache.set(get_departement_detail_key(dept.slug), detail_data, DEP_CACHE_TTL_DETAIL)
        self.stdout.write(self.style.SUCCESS(f'Cache départements: {dept_qs.count()} départements'))

        self.stdout.write(self.style.SUCCESS('Cache precharge avec succes'))
