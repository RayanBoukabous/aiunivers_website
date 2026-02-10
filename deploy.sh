#!/bin/bash
# Script de déploiement complet pour AIUnivers sur AWS
# Usage: ./deploy.sh [start|stop|restart|logs|backup|clean]

set -e

PROJECT_NAME="aiunivers"
COMPOSE_FILE="docker-compose.prod.yml"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}"
cat << "EOF"
   _   ___ _   _ _   _ _____   _____ ____  ____  
  / \ |_ _| | | | \ | |_ _\ \ / / __||  _ \/ ___| 
 / _ \ | || | | |  \| || | \ V /| _| | |_) \___ \ 
/ ___ \| || |_| | |\  || |  | | | |___|  _ < ___) |
/_/   \_\___\___/|_| \_|___| |_| |_____|_| \_\____/ 
                                                     
Déploiement Production
EOF
echo -e "${NC}"

# Check if .env.prod exists
if [ ! -f .env.prod ]; then
    echo -e "${RED}✗ Fichier .env.prod manquant!${NC}"
    echo "Copiez .env.prod.example vers .env.prod et configurez vos variables:"
    echo "  cp .env.prod.example .env.prod"
    echo "  nano .env.prod"
    exit 1
fi

# Load environment variables
export $(grep -v '^#' .env.prod | xargs)

# Functions
function start_services() {
    echo -e "${YELLOW}=== Démarrage des services ===${NC}"
    
    # Create necessary directories
    mkdir -p backups backend/media backend/staticfiles nginx/conf.d certbot/conf certbot/www
    
    # Set proper permissions
    chmod +x backend/scripts/entrypoint-prod.sh scripts/backup-db.sh scripts/init-backup-cron.sh
    
    # Build and start services
    echo "Building images..."
    docker-compose -f ${COMPOSE_FILE} build --no-cache
    
    echo "Starting services..."
    docker-compose -f ${COMPOSE_FILE} up -d
    
    echo -e "${GREEN}✓ Services démarrés${NC}"
    echo ""
    echo "Vérification de l'état des services..."
    sleep 10
    docker-compose -f ${COMPOSE_FILE} ps
    
    echo ""
    echo -e "${GREEN}=== Déploiement terminé ===${NC}"
    echo ""
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔧 Backend Admin: http://localhost:8000/admin"
    echo "   → Email: contact@aiunivers.ai"
    echo "   → Mot de passe: Aiunivers2026//@"
    echo "📊 API: http://localhost:8000/api"
    echo "📦 PostgreSQL: localhost:5432"
    echo ""
    echo "📝 Logs: ./deploy.sh logs"
    echo "🛑 Arrêter: ./deploy.sh stop"
    echo "🔄 Redémarrer: ./deploy.sh restart"
    echo "💾 Backup manuel: ./deploy.sh backup"
}

function stop_services() {
    echo -e "${YELLOW}=== Arrêt des services ===${NC}"
    docker-compose -f ${COMPOSE_FILE} down
    echo -e "${GREEN}✓ Services arrêtés${NC}"
}

function restart_services() {
    echo -e "${YELLOW}=== Redémarrage des services ===${NC}"
    docker-compose -f ${COMPOSE_FILE} restart
    echo -e "${GREEN}✓ Services redémarrés${NC}"
}

function show_logs() {
    SERVICE=${2:-}
    if [ -z "$SERVICE" ]; then
        echo "Affichage de tous les logs (Ctrl+C pour quitter):"
        docker-compose -f ${COMPOSE_FILE} logs -f --tail=100
    else
        echo "Affichage des logs de $SERVICE (Ctrl+C pour quitter):"
        docker-compose -f ${COMPOSE_FILE} logs -f --tail=100 $SERVICE
    fi
}

function manual_backup() {
    echo -e "${YELLOW}=== Backup manuel de la base de données ===${NC}"
    docker-compose -f ${COMPOSE_FILE} exec postgres /usr/local/bin/backup-db.sh
    echo -e "${GREEN}✓ Backup terminé. Fichiers dans ./backups/${NC}"
    ls -lh backups/ | tail -5
}

function clean_all() {
    echo -e "${RED}=== Nettoyage complet (ATTENTION: supprime les volumes!) ===${NC}"
    read -p "Êtes-vous sûr? Cette action est irréversible! (yes/no): " confirm
    if [ "$confirm" = "yes" ]; then
        docker-compose -f ${COMPOSE_FILE} down -v
        echo -e "${GREEN}✓ Nettoyage terminé${NC}"
    else
        echo "Annulé."
    fi
}

function check_health() {
    echo -e "${YELLOW}=== Vérification de la santé des services ===${NC}"
    echo ""
    
    echo "Backend:"
    curl -sf http://localhost:8000/api/health/ && echo " ✓ OK" || echo " ✗ FAIL"
    
    echo "Frontend:"
    curl -sf http://localhost:3000 > /dev/null && echo " ✓ OK" || echo " ✗ FAIL"
    
    echo "PostgreSQL:"
    docker-compose -f ${COMPOSE_FILE} exec -T postgres pg_isready -U ${POSTGRES_USER} && echo " ✓ OK" || echo " ✗ FAIL"
    
    echo ""
    echo "État des containers:"
    docker-compose -f ${COMPOSE_FILE} ps
}

function show_help() {
    echo "Usage: ./deploy.sh [COMMAND]"
    echo ""
    echo "Commandes:"
    echo "  start      Démarrer tous les services (défaut)"
    echo "  stop       Arrêter tous les services"
    echo "  restart    Redémarrer tous les services"
    echo "  logs       Afficher les logs (logs [service])"
    echo "  backup     Effectuer un backup manuel de la DB"
    echo "  health     Vérifier la santé des services"
    echo "  clean      Nettoyer complètement (supprime les volumes!)"
    echo "  help       Afficher cette aide"
    echo ""
    echo "Exemples:"
    echo "  ./deploy.sh              # Démarrer tous les services"
    echo "  ./deploy.sh logs backend # Voir les logs du backend"
    echo "  ./deploy.sh backup       # Backup manuel"
}

# Main script logic
COMMAND=${1:-start}

case $COMMAND in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    logs)
        show_logs "$@"
        ;;
    backup)
        manual_backup
        ;;
    health)
        check_health
        ;;
    clean)
        clean_all
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}Commande inconnue: $COMMAND${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac
