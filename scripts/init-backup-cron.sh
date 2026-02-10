#!/bin/bash
# Initialize automatic backup cron job

set -e

echo "Setting up automatic database backups..."

# Install cron in the container
apk add --no-cache busybox-suid

# Create cron job file (runs at 2:00 AM every day)
echo "0 2 * * * /usr/local/bin/backup-db.sh >> /var/log/backup.log 2>&1" > /etc/crontabs/root

# Make backup script executable
chmod +x /usr/local/bin/backup-db.sh

# Create log file
touch /var/log/backup.log

# Start crond in the background
crond -f -d 8 &

echo "✓ Automatic backups configured (daily at 2:00 AM)"
