#!/usr/bin/env python
"""Crée le superuser contact@aiunivers.ai si inexistant."""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aiunivers_backend.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()
email = 'contact@aiunivers.ai'
password = 'AIUNIVERS2026--/@'

if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(username=email, email=email, password=password)
    print('[backend] Superuser contact@aiunivers.ai cree')
else:
    print('[backend] Superuser existant, skip')
