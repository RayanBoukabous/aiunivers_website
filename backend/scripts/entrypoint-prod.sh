#!/bin/bash
set -e

echo "=== AIUnivers Backend Production Entrypoint ==="

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL..."
while ! pg_isready -h "${POSTGRES_HOST:-postgres}" -p "${POSTGRES_PORT:-5432}" -U "${POSTGRES_USER:-aiunivers}" > /dev/null 2>&1; do
    sleep 1
done
echo "✓ PostgreSQL is ready"

# Run migrations
echo "Running database migrations..."
python manage.py migrate --noinput
echo "✓ Migrations completed"

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput --clear
echo "✓ Static files collected"

# Create superuser if it doesn't exist
echo "Checking superuser..."
python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(email='contact@aiunivers.ai').exists():
    User.objects.create_superuser(
        username='admin',
        email='contact@aiunivers.ai',
        password='Aiunivers2026//@'
    )
    print('✓ Superuser created: contact@aiunivers.ai')
else:
    print('✓ Superuser already exists')
END

# Generate initial data if needed
echo "Checking for initial data..."
SOLUTION_COUNT=$(python manage.py shell -c "from solutions.models import Solution; print(Solution.objects.count())")
if [ "$SOLUTION_COUNT" = "0" ]; then
    echo "Generating initial solutions..."
    python manage.py generate_solutions
    echo "✓ Solutions generated"
fi

DEPT_COUNT=$(python manage.py shell -c "from departements.models import Departement; print(Departement.objects.count())")
if [ "$DEPT_COUNT" = "0" ]; then
    echo "Generating initial departments..."
    python manage.py generate_departments
    echo "✓ Departments generated"
fi

echo "=== Backend initialization complete ==="
echo "Starting Gunicorn..."

# Execute the CMD from Dockerfile
exec "$@"
