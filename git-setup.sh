#!/bin/bash
# Script pour initialiser et pusher le projet sur GitHub

set -e

echo "========================================"
echo "Configuration Git pour AIUnivers"
echo "========================================"
echo ""

# Vérifier qu'on est dans le bon dossier
if [ ! -f "deploy.sh" ]; then
    echo "ERREUR: Ce script doit être lancé depuis la racine du projet aiunivers_website"
    exit 1
fi

# Initialiser Git si pas déjà fait
if [ ! -d ".git" ]; then
    echo "Initialisation du dépôt Git..."
    git init
    echo "✓ Git initialisé"
else
    echo "✓ Dépôt Git déjà initialisé"
fi

# Configurer le remote (supprimer l'ancien si existe)
echo "Configuration du remote GitHub..."
git remote remove origin 2>/dev/null || true
git remote add origin git@github.com:RayanBoukabous/aiunivers_website.git
echo "✓ Remote configuré: git@github.com:RayanBoukabous/aiunivers_website.git"

# Configurer la branche principale
git branch -M main 2>/dev/null || true

# Ajouter tous les fichiers (le .gitignore exclut automatiquement les fichiers sensibles)
echo ""
echo "Ajout des fichiers..."
git add .

# Afficher le statut
echo ""
echo "Fichiers à committer:"
git status --short | head -20
echo "..."
echo ""

# Compter les fichiers
FILE_COUNT=$(git diff --cached --numstat | wc -l)
echo "Total: $FILE_COUNT fichiers prêts pour commit"
echo ""

# Demander confirmation
read -p "Voulez-vous continuer avec le commit et le push? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Création du commit..."
    git commit -m "Initial commit: AIUnivers production-ready

- Configuration Docker complète pour AWS
- Frontend Next.js avec TypeScript et Tailwind
- Backend Django REST avec PostgreSQL
- Scripts de déploiement et backups automatiques
- Documentation de déploiement
- Superuser auto-créé: contact@aiunivers.ai"

    echo "✓ Commit créé"
    echo ""
    echo "Push vers GitHub..."
    git push -u origin main
    
    echo ""
    echo "========================================"
    echo "✓ Projet pushé sur GitHub avec succès!"
    echo "========================================"
    echo ""
    echo "Dépôt: https://github.com/RayanBoukabous/aiunivers_website"
    echo ""
    echo "Vous pouvez maintenant cloner sur AWS:"
    echo "  git clone git@github.com:RayanBoukabous/aiunivers_website.git"
else
    echo "Annulé."
    exit 0
fi
