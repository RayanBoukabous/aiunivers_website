"""
URLs pour l'API Secteurs.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SecteurViewSet

router = DefaultRouter()
router.register(r'secteurs', SecteurViewSet, basename='secteur')

urlpatterns = [
    path('', include(router.urls)),
]
