"""
URLs pour l'API Départements.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DepartementViewSet

router = DefaultRouter()
router.register(r'departements', DepartementViewSet, basename='departement')

urlpatterns = [
    path('', include(router.urls)),
]
