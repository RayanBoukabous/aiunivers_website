"""
Serializers pour l'API Départements.
"""
from rest_framework import serializers
from solutions.serializers import SolutionListSerializer
from .models import Departement


class DepartementListSerializer(serializers.ModelSerializer):
    """Serializer pour les listes, avec solutions (titres seulement)."""
    solutions_count = serializers.SerializerMethodField()
    solutions = serializers.SerializerMethodField()

    class Meta:
        model = Departement
        fields = [
            'id', 'slug', 'order',
            'nom_ar', 'nom_fr', 'nom_en', 'nom_es', 'nom_de',
            'description_ar', 'description_fr', 'description_en',
            'description_es', 'description_de',
            'cover_image', 'solutions_count', 'solutions',
        ]

    def get_solutions_count(self, obj):
        return obj.solutions.count()

    def get_solutions(self, obj):
        solutions = obj.solutions.order_by('order', 'slug').values(
            'slug', 'nom_ar', 'nom_fr', 'nom_en', 'nom_es', 'nom_de'
        )
        return list(solutions)


class DepartementDetailSerializer(serializers.ModelSerializer):
    """Serializer complet avec solutions liées."""
    solutions = SolutionListSerializer(many=True, read_only=True)

    class Meta:
        model = Departement
        fields = [
            'id', 'slug', 'order',
            'nom_ar', 'nom_fr', 'nom_en', 'nom_es', 'nom_de',
            'description_ar', 'description_fr', 'description_en',
            'description_es', 'description_de',
            'cover_image', 'solutions',
            'created_at', 'updated_at',
        ]
