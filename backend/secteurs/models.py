"""
Modèles pour l'application Secteurs - Multilingue (AR, FR, EN, ES, DE).
"""
from django.db import models
from django.utils.text import slugify


class Secteur(models.Model):
    """
    Secteur d'activité avec contenu multilingue.
    Peut être lié à une ou plusieurs solutions.
    """
    slug = models.SlugField(unique=True, max_length=100, db_index=True)
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
        upload_to='secteurs/covers/',
        blank=True,
        null=True,
        max_length=255
    )

    # Solutions liées (1 ou plusieurs)
    solutions = models.ManyToManyField(
        'solutions.Solution',
        related_name='secteurs',
        blank=True
    )

    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'slug']
        verbose_name = 'Secteur'
        verbose_name_plural = 'Secteurs'
        indexes = [
            models.Index(fields=['is_active', 'order']),
        ]

    def __str__(self):
        return self.nom_fr

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nom_fr)
        super().save(*args, **kwargs)
