"""
Health check endpoint pour monitoring
"""
from django.http import JsonResponse
from django.views.decorators.cache import never_cache


@never_cache
def health_check(request):
    """Simple health check endpoint"""
    return JsonResponse({
        'status': 'healthy',
        'service': 'aiunivers-backend'
    })
