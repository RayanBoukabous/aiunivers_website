"""
URL configuration for aiunivers_backend.
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from aiunivers_backend.media_views import serve_media
from aiunivers_backend.health import health_check
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    # Médias (images, vidéos) - en premier pour éviter les conflits
    path('media/<path:path>', serve_media),
    path('admin/', admin.site.urls),
    path('api/', include('aiunivers_backend.api_urls')),
    path('api/health/', health_check, name='health_check'),
]

if settings.DEBUG:
    urlpatterns += [
        path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
        path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    ]
