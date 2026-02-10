"""
API Views pour Solutions - Cache + performances optimisées.
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from django.core.cache import cache
from .models import Solution, SolutionDemoImage
from .serializers import SolutionListSerializer, SolutionDetailSerializer
from .cache_utils import (
    get_solutions_list_key,
    get_solution_detail_key,
    get_all_solutions_key,
    CACHE_TTL_LIST,
    CACHE_TTL_DETAIL,
    CACHE_TTL_ALL,
)


class SolutionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet en lecture seule pour les solutions.
    Cache agressif pour répondre instantanément.
    """
    queryset = Solution.objects.filter(is_active=True)
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'

    def get_queryset(self):
        return Solution.objects.filter(is_active=True).order_by('order', 'slug')

    def get_serializer_class(self):
        if self.action == 'list':
            return SolutionListSerializer
        return SolutionDetailSerializer

    def list(self, request, *args, **kwargs):
        cache_key = get_solutions_list_key()
        cached = cache.get(cache_key)
        if cached is not None:
            return Response(cached)

        queryset = self.get_queryset().prefetch_related('demo_images')
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        cache.set(cache_key, data, CACHE_TTL_LIST)
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        slug = kwargs.get('slug')
        cache_key = get_solution_detail_key(slug)
        cached = cache.get(cache_key)
        if cached is not None:
            return Response(cached)

        try:
            instance = self.get_queryset().prefetch_related(
                'demo_images'
            ).get(slug=slug)
        except Solution.DoesNotExist:
            return Response(
                {'detail': 'Solution non trouvée'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(instance)
        data = serializer.data
        cache.set(cache_key, data, CACHE_TTL_DETAIL)
        return Response(data)

    @action(detail=False, methods=['get'], url_path='preload')
    def preload(self, request):
        """
        Endpoint pour précharger toutes les données en cache.
        Appelé au démarrage ou périodiquement pour warm-up.
        """
        cache_key = get_all_solutions_key()
        cached = cache.get(cache_key)
        if cached is not None:
            return Response({'status': 'already_cached', 'count': len(cached)})

        queryset = self.get_queryset().prefetch_related('demo_images')
        list_serializer = SolutionListSerializer(queryset, many=True)
        detail_data = []
        for solution in queryset:
            detail_serializer = SolutionDetailSerializer(solution)
            detail_data.append({
                'slug': solution.slug,
                'data': detail_serializer.data
            })

        cache.set(get_solutions_list_key(), list_serializer.data, CACHE_TTL_LIST)
        for item in detail_data:
            cache.set(
                get_solution_detail_key(item['slug']),
                item['data'],
                CACHE_TTL_DETAIL
            )
        cache.set(cache_key, detail_data, CACHE_TTL_ALL)

        return Response({
            'status': 'cached',
            'count': len(detail_data),
            'message': 'Toutes les solutions ont été mises en cache'
        })
