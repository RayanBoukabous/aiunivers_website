from django.apps import AppConfig


class SecteursConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'secteurs'
    verbose_name = 'Secteurs AIUnivers'

    def ready(self):
        import secteurs.signals  # noqa: F401