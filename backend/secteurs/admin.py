"""
Admin Django pour les Secteurs.
"""
from django.contrib import admin
from django.utils.html import format_html
from .models import Secteur


@admin.register(Secteur)
class SecteurAdmin(admin.ModelAdmin):
    list_display = [
        'nom_fr', 'slug', 'order', 'is_active',
        'cover_preview', 'updated_at'
    ]
    list_editable = ['order', 'is_active']
    list_filter = ['is_active', 'created_at']
    search_fields = ['nom_fr', 'nom_ar', 'nom_en', 'slug']
    prepopulated_fields = {'slug': ('nom_fr',)}
    readonly_fields = ['created_at', 'updated_at', 'cover_preview']
    filter_horizontal = ['solutions']

    fieldsets = (
        ('Identification', {
            'fields': ('slug', 'order', 'is_active')
        }),
        ('Noms (multilingue)', {
            'fields': ('nom_ar', 'nom_fr', 'nom_en', 'nom_es', 'nom_de')
        }),
        ('Descriptions (multilingue)', {
            'fields': (
                'description_ar', 'description_fr', 'description_en',
                'description_es', 'description_de'
            )
        }),
        ('Médias', {
            'fields': ('cover_image', 'cover_preview')
        }),
        ('Solutions liées', {
            'fields': ('solutions',)
        }),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at')
        }),
    )

    def cover_preview(self, obj):
        if obj.cover_image:
            return format_html(
                '<img src="{}" style="max-height: 60px; max-width: 100px;" />',
                obj.cover_image.url
            )
        return '-'

    cover_preview.short_description = 'Aperçu'
