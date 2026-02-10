"""
Modèles pour l'application Départements - Multilingue (AR, FR, EN, ES, DE).
Chaque département peut pointer vers 0, 1 ou plusieurs solutions (ManyToMany).
"""
from django.db import models
from django.utils.text import slugify


class Departement(models.Model):
    """
    Département avec contenu multilingue.
    ManyToMany vers Solution : un département peut avoir 0, 1 ou plusieurs solutions.
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
        upload_to='departements/covers/',
        blank=True,
        null=True,
        max_length=255
    )

    # Solutions (0, 1 ou plusieurs)
    solutions = models.ManyToManyField(
        'solutions.Solution',
        related_name='departements',
        blank=True,
    )

    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'slug']
        verbose_name = 'Département'
        verbose_name_plural = 'Départements'
        indexes = [
            models.Index(fields=['is_active', 'order']),
        ]

    def __str__(self):
        return self.nom_fr

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nom_fr)
        super().save(*args, **kwargs)
