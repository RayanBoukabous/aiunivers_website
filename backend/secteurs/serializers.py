"""
Serializers pour l'API Secteurs.
"""
from rest_framework import serializers
from solutions.serializers import SolutionListSerializer
from .models import Secteur


class SecteurListSerializer(serializers.ModelSerializer):
    """Serializer léger pour les listes."""
    solutions_count = serializers.SerializerMethodField()

    class Meta:
        model = Secteur
        fields = [
            'id', 'slug', 'order',
            'nom_ar', 'nom_fr', 'nom_en', 'nom_es', 'nom_de',
            'description_ar', 'description_fr', 'description_en',
            'description_es', 'description_de',
            'cover_image', 'solutions_count',
        ]

    def get_solutions_count(self, obj):
        return obj.solutions.count()


class SecteurDetailSerializer(serializers.ModelSerializer):
    """Serializer complet avec solutions liées."""
    solutions = SolutionListSerializer(many=True, read_only=True)

    class Meta:
        model = Secteur
        fields = [
            'id', 'slug', 'order',
            'nom_ar', 'nom_fr', 'nom_en', 'nom_es', 'nom_de',
            'description_ar', 'description_fr', 'description_en',
            'description_es', 'description_de',
            'cover_image', 'solutions',
            'created_at', 'updated_at',
        ]
