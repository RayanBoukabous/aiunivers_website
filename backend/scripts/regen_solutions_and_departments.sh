#!/usr/bin/env bash
# Régénère les 10 solutions puis réattribue les solutions aux départements.
# Usage: depuis backend/ : ./scripts/regen_solutions_and_departments.sh
# Prérequis: python manage.py migrate (si pas encore fait, pour solutions 0004)

set -e
cd "$(dirname "$0")/.."
echo "=== Application des migrations (si besoin) ==="
python manage.py migrate --noinput
echo ""
echo "=== Régénération des 10 solutions (--clear) ==="
python manage.py generate_solutions --clear
echo ""
echo "=== Réattribution des solutions aux départements ==="
python manage.py generate_departments --reassign-only
echo ""
echo "=== Terminé ==="
