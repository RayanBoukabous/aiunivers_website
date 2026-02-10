"""
Modèles pour l'application Solutions - Multilingue (AR, FR, EN, ES, DE).
"""
from django.db import models
from django.utils.text import slugify


class Solution(models.Model):
    """
    Solution produit avec contenu multilingue complet.
    Optimisé avec index pour les recherches par slug et ordre.
    """
    slug = models.SlugField(unique=True, max_length=100, db_index=True, blank=True)
    order = models.PositiveIntegerField(default=0, db_index=True)

    # Noms - 5 langues
    nom_ar = models.CharField(max_length=255)
    nom_fr = models.CharField(max_length=255)
    nom_en = models.CharField(max_length=255)
    nom_es = models.CharField(max_length=255)
    nom_de = models.CharField(max_length=255)

    # Descriptions - 5 langues
    description_ar = models.TextField(blank=True)
    description_fr = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    description_es = models.TextField(blank=True)
    description_de = models.TextField(blank=True)

    # Image de couverture
    cover_image = models.ImageField(
        upload_to='solutions/covers/',
        blank=True,
        null=True,
        max_length=255
    )

    # Vidéo démo
    demo_video = models.FileField(
        upload_to='solutions/videos/',
        blank=True,
        null=True,
        max_length=255
    )

    # Avantages - texte, une ligne = un élément (par langue)
    avantage_ar = models.TextField(blank=True, default='')
    avantage_fr = models.TextField(blank=True, default='')
    avantage_en = models.TextField(blank=True, default='')
    avantage_es = models.TextField(blank=True, default='')
    avantage_de = models.TextField(blank=True, default='')

    # Principales fonctions - texte, une ligne = un élément (par langue)
    principale_fonctions_ar = models.TextField(blank=True, default='')
    principale_fonctions_fr = models.TextField(blank=True, default='')
    principale_fonctions_en = models.TextField(blank=True, default='')
    principale_fonctions_es = models.TextField(blank=True, default='')
    principale_fonctions_de = models.TextField(blank=True, default='')

    # Use cases - texte, une ligne = un élément (par langue)
    use_cases_ar = models.TextField(blank=True, default='')
    use_cases_fr = models.TextField(blank=True, default='')
    use_cases_en = models.TextField(blank=True, default='')
    use_cases_es = models.TextField(blank=True, default='')
    use_cases_de = models.TextField(blank=True, default='')

    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'slug']
        verbose_name = 'Solution'
        verbose_name_plural = 'Solutions'
        indexes = [
            models.Index(fields=['is_active', 'order']),
        ]

    def __str__(self):
        return self.nom_fr

    @staticmethod
    def text_to_list(text):
        """Convertit un texte (une ligne = un élément) en liste, pour l'API."""
        if not text:
            return []
        return [line.strip() for line in text.splitlines() if line.strip()]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nom_fr)
        super().save(*args, **kwargs)


class SolutionDemoImage(models.Model):
    """
    Images de démonstration pour une solution.
    Plusieurs images par solution.
    """
    solution = models.ForeignKey(
        Solution,
        on_delete=models.CASCADE,
        related_name='demo_images'
    )
    image = models.ImageField(
        upload_to='solutions/demos/',
        max_length=255
    )
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Image démo'
        verbose_name_plural = 'Images démo'

    def __str__(self):
        return f"{self.solution.nom_fr} - Image {self.order}"
