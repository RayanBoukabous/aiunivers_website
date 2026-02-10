"""
Admin Django pour les Solutions - Interface complète.
Champs avantages / principales fonctions / use cases : texte, une ligne = un élément.
"""
from django import forms
from django.contrib import admin
from django.utils.html import format_html
from .models import Solution, SolutionDemoImage


LIST_TEXT_FIELDS = [
    'avantage_ar', 'avantage_fr', 'avantage_en', 'avantage_es', 'avantage_de',
    'principale_fonctions_ar', 'principale_fonctions_fr', 'principale_fonctions_en',
    'principale_fonctions_es', 'principale_fonctions_de',
    'use_cases_ar', 'use_cases_fr', 'use_cases_en', 'use_cases_es', 'use_cases_de',
]


class SolutionAdminForm(forms.ModelForm):
    """Form : champs liste en TextField (une ligne = un élément)."""
    class Meta:
        model = Solution
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in LIST_TEXT_FIELDS:
            if field in self.fields:
                self.fields[field].required = False
                self.fields[field].widget = forms.Textarea(attrs={'rows': 6})


class SolutionDemoImageInline(admin.TabularInline):
    model = SolutionDemoImage
    extra = 1
    ordering = ['order']


@admin.register(Solution)
class SolutionAdmin(admin.ModelAdmin):
    form = SolutionAdminForm
    list_display = [
        'nom_fr', 'slug', 'order', 'is_active',
        'cover_preview', 'updated_at'
    ]
    list_editable = ['order', 'is_active']
    list_filter = ['is_active', 'created_at']
    search_fields = ['nom_fr', 'nom_ar', 'nom_en', 'slug']
    prepopulated_fields = {'slug': ('nom_fr',)}
    readonly_fields = ['created_at', 'updated_at', 'cover_preview']

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
            'fields': ('cover_image', 'cover_preview', 'demo_video')
        }),
        ('Avantages (texte : une ligne = un élément)', {
            'fields': (
                'avantage_ar', 'avantage_fr', 'avantage_en',
                'avantage_es', 'avantage_de'
            )
        }),
        ('Principales fonctions (texte : une ligne = un élément)', {
            'fields': (
                'principale_fonctions_ar', 'principale_fonctions_fr',
                'principale_fonctions_en', 'principale_fonctions_es',
                'principale_fonctions_de'
            )
        }),
        ('Use cases (texte : une ligne = un élément)', {
            'fields': (
                'use_cases_ar', 'use_cases_fr', 'use_cases_en',
                'use_cases_es', 'use_cases_de'
            )
        }),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at')
        }),
    )

    inlines = [SolutionDemoImageInline]

    def cover_preview(self, obj):
        if obj and obj.cover_image:
            return format_html(
                '<img src="{}" style="max-height: 60px; max-width: 100px;" />',
                obj.cover_image.url
            )
        return '-'

    cover_preview.short_description = 'Aperçu'


@admin.register(SolutionDemoImage)
class SolutionDemoImageAdmin(admin.ModelAdmin):
    list_display = ['solution', 'order', 'image_preview', 'created_at']
    list_filter = ['solution']
    ordering = ['solution', 'order']

    def image_preview(self, obj):
        if obj and obj.image:
            return format_html(
                '<img src="{}" style="max-height: 50px; max-width: 80px;" />',
                obj.image.url
            )
        return '-'

    image_preview.short_description = 'Aperçu'
