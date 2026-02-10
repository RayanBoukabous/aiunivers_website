#!/usr/bin/env python
"""Crée le superuser admin / admin si inexistant."""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aiunivers_backend.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()
if User.objects.filter(username='admin').exists():
    print('Superuser admin existe déjà.')
else:
    User.objects.create_superuser('admin', 'admin@example.com', 'admin')
    print('Superuser créé: username=admin, password=admin')
