#!/bin/bash
# PostgreSQL Backup Script - Runs daily at 2:00 AM

set -e

BACKUP_DIR="/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/aiunivers_backup_${TIMESTAMP}.sql.gz"

# Ensure backup directory exists
mkdir -p "${BACKUP_DIR}"

# Perform backup
echo "Starting database backup at $(date)"
pg_dump -U "${POSTGRES_USER}" "${POSTGRES_DB}" | gzip > "${BACKUP_FILE}"

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo "✓ Backup completed: ${BACKUP_FILE}"
    
    # Keep only last 30 days of backups (delete older files)
    find "${BACKUP_DIR}" -name "aiunivers_backup_*.sql.gz" -type f -mtime +30 -delete
    echo "✓ Old backups cleaned up (kept last 30 days)"
else
    echo "✗ Backup failed!" >&2
    exit 1
fi

# Log backup info
BACKUP_SIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
echo "Backup size: ${BACKUP_SIZE}"
echo "Backup completed successfully at $(date)"
