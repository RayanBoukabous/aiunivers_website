"""
Admin Django pour les Départements.
Chaque département peut avoir 0, 1 ou plusieurs solutions (ManyToMany).
"""
from django.contrib import admin
from .models import Departement


@admin.register(Departement)
class DepartementAdmin(admin.ModelAdmin):
    list_display = ['nom_fr', 'slug', 'order', 'solutions_count', 'is_active', 'updated_at']
    list_filter = ['is_active']
    search_fields = ['nom_fr', 'nom_en', 'slug']
    prepopulated_fields = {'slug': ('nom_fr',)}
    ordering = ['order', 'slug']
    filter_horizontal = ['solutions']

    @admin.display(description='Solutions')
    def solutions_count(self, obj):
        return obj.solutions.count()
