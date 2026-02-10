#!/bin/bash
# Repartir de zero et tout pusher sur un nouveau repo GitHub
# Usage: ./NOUVEAU_REPO_FROM_ZERO.sh [URL_DU_REPO]
# Exemple: ./NOUVEAU_REPO_FROM_ZERO.sh git@github.com:RayanBoukabous/aiunivers_website.git

set -e

REPO_URL="${1:-git@github.com:RayanBoukabous/aiunivers_website.git}"
cd "$(dirname "$0")"

echo "=============================================="
echo "  AIUnivers - Nouveau depot from zero"
echo "=============================================="
echo ""
echo "Repo cible: $REPO_URL"
echo ""

# 1. Supprimer TOUS les .git (racine + front)
echo "[1/6] Suppression des anciens .git..."
rm -rf .git 2>/dev/null || true
rm -rf front/.git 2>/dev/null || true
rm -rf backend/.git 2>/dev/null || true
echo "      OK"
echo ""

# 2. Init propre
echo "[2/6] Initialisation du depot Git..."
git init
git branch -M main
echo "      OK"
echo ""

# 3. Remote
echo "[3/6] Configuration du remote..."
git remote add origin "$REPO_URL"
echo "      OK"
echo ""

# 4. Ajouter tous les fichiers (sauf ceux dans .gitignore)
echo "[4/6] Ajout des fichiers (front + backend + config)..."
git add .
NB=$(git status --short | wc -l)
echo "      $NB fichiers a committer"
echo ""

# 5. Commit
echo "[5/6] Commit..."
git commit -m "Initial commit: AIUnivers - Front Next.js + Backend Django + Docker AWS"
echo "      OK"
echo ""

# 6. Push
echo "[6/6] Push vers GitHub..."
git push -u origin main
echo ""
echo "=============================================="
echo "  Termine. Tout est sur: $REPO_URL"
echo "=============================================="
