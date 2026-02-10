"""
Vue personnalisée pour servir les fichiers média (images, vidéos).
"""
import mimetypes
import os
from pathlib import Path

from django.http import FileResponse, Http404
from django.utils._os import safe_join
from django.utils.http import http_date


def serve_media(request, path):
    """Sert les fichiers depuis MEDIA_ROOT."""
    from django.conf import settings
    from django.http import HttpResponse
    document_root = Path(settings.MEDIA_ROOT)
    path = path.lstrip('/')
    full_path = Path(safe_join(str(document_root), path))
    if not full_path.exists() or not full_path.is_file():
        raise Http404(f"File not found: {path}")
    if not str(full_path.resolve()).startswith(str(document_root.resolve())):
        raise Http404("Invalid path")
    content_type, encoding = mimetypes.guess_type(str(full_path))
    content_type = content_type or "application/octet-stream"
    response = FileResponse(full_path.open("rb"), content_type=content_type)
    response.headers["Last-Modified"] = http_date(full_path.stat().st_mtime)
    if encoding:
        response["Content-Encoding"] = encoding
    return response
