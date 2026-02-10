"""
API Views pour Départements - Cache + performances optimisées.
"""
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.cache import cache

from .models import Departement
from .serializers import DepartementListSerializer, DepartementDetailSerializer
from .cache_utils import (
    get_departements_list_key,
    get_departement_detail_key,
    CACHE_TTL_LIST,
    CACHE_TTL_DETAIL,
)


class DepartementViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet en lecture seule pour les départements.
    """
    queryset = Departement.objects.filter(is_active=True)
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'

    def get_queryset(self):
        return Departement.objects.filter(is_active=True).prefetch_related(
            'solutions', 'solutions__demo_images'
        ).order_by('order', 'slug')

    def get_serializer_class(self):
        if self.action == 'list':
            return DepartementListSerializer
        return DepartementDetailSerializer

    def list(self, request, *args, **kwargs):
        cache_key = get_departements_list_key()
        cached = cache.get(cache_key)
        if cached is not None:
            return Response(cached)

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        cache.set(cache_key, data, CACHE_TTL_LIST)
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        slug = kwargs.get('slug')
        cache_key = get_departement_detail_key(slug)
        cached = cache.get(cache_key)
        if cached is not None:
            return Response(cached)

        try:
            instance = self.get_queryset().get(slug=slug)
        except Departement.DoesNotExist:
            return Response(
                {'detail': 'Département non trouvé'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(instance)
        data = serializer.data
        cache.set(cache_key, data, CACHE_TTL_DETAIL)
        return Response(data)
