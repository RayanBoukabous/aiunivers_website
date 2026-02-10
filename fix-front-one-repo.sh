#!/bin/bash
# Supprime le .git dans front/ pour que tout soit dans le meme repo

set -e

cd "$(dirname "$0")"

if [ -d "front/.git" ]; then
  echo "Suppression de front/.git (ancien depot imbrique)..."
  rm -rf front/.git
  echo "OK. Le dossier front est maintenant un dossier normal."
else
  echo "front/.git n'existe pas deja."
fi

echo ""
echo "Ajout de tous les fichiers au repo parent..."
git add .
echo ""
echo "Statut Git :"
git status --short | head -30
echo ""
echo "Pour committer et pusher :"
echo "  git commit -m \"Un seul repo: front + backend\""
echo "  git push -u origin main"
