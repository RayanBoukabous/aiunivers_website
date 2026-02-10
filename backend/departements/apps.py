from django.apps import AppConfig


class DepartementsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'departements'
    verbose_name = 'Départements AIUnivers'

    def ready(self):
        import departements.signals  # noqa: F401
