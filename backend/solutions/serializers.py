"""
Serializers pour l'API Solutions - Format optimisé pour le frontend.
"""
from rest_framework import serializers
from .models import Solution, SolutionDemoImage


class SolutionDemoImageSerializer(serializers.ModelSerializer):
    """Serializer pour les images de démo."""

    class Meta:
        model = SolutionDemoImage
        fields = ['id', 'image', 'order']


class SolutionListSerializer(serializers.ModelSerializer):
    """
    Serializer léger pour les listes - minimiser la charge.
    """
    demo_images_count = serializers.SerializerMethodField()

    class Meta:
        model = Solution
        fields = [
            'id', 'slug', 'order',
            'nom_ar', 'nom_fr', 'nom_en', 'nom_es', 'nom_de',
            'description_ar', 'description_fr', 'description_en',
            'description_es', 'description_de',
            'cover_image', 'demo_images_count',
        ]

    def get_demo_images_count(self, obj):
        return obj.demo_images.count()


class SolutionDetailSerializer(serializers.ModelSerializer):
    """
    Serializer complet pour le détail d'une solution.
    Les champs avantage / principale_fonctions / use_cases sont stockés en texte (une ligne = un élément)
    et exposés en liste pour l'API.
    """
    demo_images = SolutionDemoImageSerializer(many=True, read_only=True)
    avantage_ar = serializers.SerializerMethodField()
    avantage_fr = serializers.SerializerMethodField()
    avantage_en = serializers.SerializerMethodField()
    avantage_es = serializers.SerializerMethodField()
    avantage_de = serializers.SerializerMethodField()
    principale_fonctions_ar = serializers.SerializerMethodField()
    principale_fonctions_fr = serializers.SerializerMethodField()
    principale_fonctions_en = serializers.SerializerMethodField()
    principale_fonctions_es = serializers.SerializerMethodField()
    principale_fonctions_de = serializers.SerializerMethodField()
    use_cases_ar = serializers.SerializerMethodField()
    use_cases_fr = serializers.SerializerMethodField()
    use_cases_en = serializers.SerializerMethodField()
    use_cases_es = serializers.SerializerMethodField()
    use_cases_de = serializers.SerializerMethodField()

    class Meta:
        model = Solution
        fields = [
            'id', 'slug', 'order',
            'nom_ar', 'nom_fr', 'nom_en', 'nom_es', 'nom_de',
            'description_ar', 'description_fr', 'description_en',
            'description_es', 'description_de',
            'cover_image', 'demo_video', 'demo_images',
            'avantage_ar', 'avantage_fr', 'avantage_en', 'avantage_es', 'avantage_de',
            'principale_fonctions_ar', 'principale_fonctions_fr', 'principale_fonctions_en',
            'principale_fonctions_es', 'principale_fonctions_de',
            'use_cases_ar', 'use_cases_fr', 'use_cases_en', 'use_cases_es', 'use_cases_de',
            'created_at', 'updated_at',
        ]

    def _text_to_list(self, text):
        return Solution.text_to_list(text)

    def get_avantage_ar(self, obj): return self._text_to_list(obj.avantage_ar)
    def get_avantage_fr(self, obj): return self._text_to_list(obj.avantage_fr)
    def get_avantage_en(self, obj): return self._text_to_list(obj.avantage_en)
    def get_avantage_es(self, obj): return self._text_to_list(obj.avantage_es)
    def get_avantage_de(self, obj): return self._text_to_list(obj.avantage_de)
    def get_principale_fonctions_ar(self, obj): return self._text_to_list(obj.principale_fonctions_ar)
    def get_principale_fonctions_fr(self, obj): return self._text_to_list(obj.principale_fonctions_fr)
    def get_principale_fonctions_en(self, obj): return self._text_to_list(obj.principale_fonctions_en)
    def get_principale_fonctions_es(self, obj): return self._text_to_list(obj.principale_fonctions_es)
    def get_principale_fonctions_de(self, obj): return self._text_to_list(obj.principale_fonctions_de)
    def get_use_cases_ar(self, obj): return self._text_to_list(obj.use_cases_ar)
    def get_use_cases_fr(self, obj): return self._text_to_list(obj.use_cases_fr)
    def get_use_cases_en(self, obj): return self._text_to_list(obj.use_cases_en)
    def get_use_cases_es(self, obj): return self._text_to_list(obj.use_cases_es)
    def get_use_cases_de(self, obj): return self._text_to_list(obj.use_cases_de)


class SolutionByLanguageSerializer(serializers.Serializer):
    """
    Serializer pour une sortie par langue - données ciblées.
    Utile pour le frontend qui ne charge qu'une langue.
    """
    id = serializers.IntegerField()
    slug = serializers.SlugField()
    nom = serializers.CharField()
    description = serializers.CharField()
    cover_image = serializers.ImageField()
    demo_video = serializers.FileField(allow_null=True)
    demo_images = SolutionDemoImageSerializer(many=True)
    avantages = serializers.ListField(child=serializers.CharField())
    principale_fonctions = serializers.ListField(child=serializers.CharField())
    use_cases = serializers.ListField(child=serializers.CharField())
