"""
URLs API - Départements et Solutions.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from departements.views import DepartementViewSet
from solutions.views import SolutionViewSet

router = DefaultRouter()
router.register(r'departements', DepartementViewSet, basename='departement')
router.register(r'solutions', SolutionViewSet, basename='solution')

urlpatterns = [
    path('', include(router.urls)),
]
