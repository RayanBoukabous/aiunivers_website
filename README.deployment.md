# 🚀 Déploiement AIUnivers sur AWS

Guide complet de déploiement en production sur AWS EC2.

## 📋 Prérequis

- Instance AWS EC2 (recommandé: t3.medium ou supérieur)
- Ubuntu 22.04 LTS ou Amazon Linux 2023
- Au moins 4 GB RAM, 20 GB stockage
- Docker et Docker Compose installés
- Nom de domaine pointant vers votre instance (optionnel mais recommandé)

## 🔧 Installation sur AWS EC2

### 1. Connexion à votre instance

```bash
ssh -i votre-cle.pem ubuntu@votre-ip-publique
```

### 2. Installation de Docker

```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation de Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Ajouter votre utilisateur au groupe docker
sudo usermod -aG docker $USER

# Installation de Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Vérification
docker --version
docker-compose --version
```

### 3. Récupération du projet

```bash
# Cloner le repository
git clone https://github.com/votre-repo/aiunivers_website.git
cd aiunivers_website
```

### 4. Configuration de l'environnement

```bash
# Créer le fichier .env.prod à partir du template
cp .env.prod.example .env.prod

# Éditer avec vos valeurs
nano .env.prod
```

**Variables importantes à configurer :**

```bash
# Base de données - CHANGEZ LE MOT DE PASSE !
POSTGRES_PASSWORD=VotreMotDePasseSecurise123!

# Django - GÉNÉREZ UNE CLÉ SECRÈTE !
DJANGO_SECRET_KEY=$(python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')

# Hosts autorisés
ALLOWED_HOSTS=votre-domaine.com,www.votre-domaine.com,votre-ip-publique,localhost

# URL de l'API pour le frontend
NEXT_PUBLIC_API_URL=https://votre-domaine.com  # ou http://votre-ip-publique
```

### 5. Déploiement en UNE commande

```bash
# Rendre le script exécutable
chmod +x deploy.sh

# Lancer le déploiement complet
./deploy.sh start
```

**Le script va automatiquement :**
✅ Créer tous les containers Docker
✅ Initialiser PostgreSQL avec backups automatiques (2h du matin)
✅ Lancer les migrations Django
✅ Créer le superuser (contact@aiunivers.ai / Aiunivers2026//@)
✅ Générer les données initiales (solutions, départements)
✅ Collecter les fichiers statiques
✅ Démarrer frontend + backend + nginx

## 🌐 Accès aux services

Après le déploiement :

- **🌐 Site web :** http://votre-ip:3000 (ou http://votre-domaine.com si nginx configuré)
- **🔧 Admin Django :** http://votre-ip:8000/admin
  - Email : `contact@aiunivers.ai`
  - Mot de passe : `Aiunivers2026//@`
- **📊 API :** http://votre-ip:8000/api

## 🛠 Commandes utiles

```bash
# Voir les logs en temps réel
./deploy.sh logs

# Voir les logs d'un service spécifique
./deploy.sh logs backend
./deploy.sh logs frontend
./deploy.sh logs postgres

# Redémarrer les services
./deploy.sh restart

# Arrêter les services
./deploy.sh stop

# Vérifier la santé des services
./deploy.sh health

# Effectuer un backup manuel
./deploy.sh backup

# Voir l'aide
./deploy.sh help
```

## 💾 Backups

### Backups automatiques

- **Fréquence :** Tous les jours à 2h00 du matin
- **Location :** `./backups/`
- **Rétention :** 30 derniers jours
- **Format :** `aiunivers_backup_YYYYMMDD_HHMMSS.sql.gz`

### Backup manuel

```bash
./deploy.sh backup
```

### Restauration d'un backup

```bash
# Arrêter les services
./deploy.sh stop

# Restaurer (remplacer DATE par le fichier voulu)
gunzip < backups/aiunivers_backup_DATE.sql.gz | docker-compose -f docker-compose.prod.yml exec -T postgres psql -U aiunivers aiunivers_db

# Redémarrer
./deploy.sh start
```

## 🔒 Sécurité (Production)

### 1. Firewall AWS (Security Groups)

Configurez les règles entrantes :

- Port 80 (HTTP) : 0.0.0.0/0
- Port 443 (HTTPS) : 0.0.0.0/0
- Port 22 (SSH) : Votre IP uniquement
- Port 8000, 3000, 5432 : Fermés (accès interne uniquement via nginx)

### 2. Certificat SSL avec Let's Encrypt

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtenir le certificat
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com

# Renouvellement automatique (déjà configuré par Certbot)
```

### 3. Changements de mot de passe

```bash
# Changer le mot de passe admin Django
docker-compose -f docker-compose.prod.yml exec backend python manage.py changepassword contact@aiunivers.ai

# Changer le mot de passe PostgreSQL
# 1. Modifier .env.prod
# 2. Redémarrer : ./deploy.sh restart
```

## 📊 Monitoring

### Logs d'application

```bash
# Backend
docker-compose -f docker-compose.prod.yml logs -f backend

# Frontend
docker-compose -f docker-compose.prod.yml logs -f frontend

# Nginx
docker-compose -f docker-compose.prod.yml logs -f nginx

# Tous
./deploy.sh logs
```

### Métriques système

```bash
# Utilisation des containers
docker stats

# Espace disque
df -h

# Vérifier la santé
./deploy.sh health
```

## 🔄 Mise à jour du code

```bash
# 1. Récupérer les dernières modifications
git pull origin main

# 2. Reconstruire et redémarrer
./deploy.sh stop
./deploy.sh start
```

## 🆘 Dépannage

### Les services ne démarrent pas

```bash
# Vérifier les logs
./deploy.sh logs

# Vérifier l'état des containers
docker ps -a

# Nettoyer et recommencer
./deploy.sh clean  # ⚠️ ATTENTION: supprime les données!
./deploy.sh start
```

### Erreur de connexion PostgreSQL

```bash
# Vérifier que PostgreSQL est prêt
docker-compose -f docker-compose.prod.yml exec postgres pg_isready -U aiunivers

# Voir les logs
docker-compose -f docker-compose.prod.yml logs postgres
```

### Frontend ne se connecte pas au backend

Vérifier que `NEXT_PUBLIC_API_URL` dans `.env.prod` pointe vers la bonne URL (avec http:// ou https://).

## 📞 Support

En cas de problème :
1. Consultez les logs : `./deploy.sh logs`
2. Vérifiez la santé : `./deploy.sh health`
3. Contactez : contact@aiunivers.ai

---

## 🎉 C'est tout !

Votre plateforme AIUnivers est maintenant en production sur AWS avec :
- ✅ Frontend Next.js optimisé
- ✅ Backend Django avec Gunicorn
- ✅ PostgreSQL avec backups automatiques quotidiens
- ✅ Nginx comme reverse proxy
- ✅ Superuser créé automatiquement
- ✅ Configuration professionnelle et sécurisée

**Commande pour tout démarrer :** `./deploy.sh start`
