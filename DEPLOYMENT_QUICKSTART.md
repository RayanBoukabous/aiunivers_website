# 🚀 Guide de Déploiement Rapide AWS

## ⚡ En 3 étapes

### 1️⃣ Sur votre machine locale

```bash
# Créer le fichier de configuration
cp env.prod.template .env.prod

# Éditer avec vos valeurs
nano .env.prod
```

**Modifiez au minimum :**
- `POSTGRES_PASSWORD` : un mot de passe fort
- `DJANGO_SECRET_KEY` : générez avec `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
- `ALLOWED_HOSTS` : votre domaine ou IP publique
- `NEXT_PUBLIC_API_URL` : l'URL de votre backend

### 2️⃣ Sur votre instance AWS EC2

```bash
# Installation Docker (une seule fois)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Se reconnecter pour appliquer les permissions Docker
exit
ssh -i votre-cle.pem ubuntu@votre-ip
```

### 3️⃣ Déploiement

```bash
# Cloner le projet
git clone https://github.com/votre-repo/aiunivers_website.git
cd aiunivers_website

# Copier votre fichier .env.prod (depuis votre machine)
# Méthode 1 : scp depuis votre machine locale
# scp -i votre-cle.pem .env.prod ubuntu@votre-ip:~/aiunivers_website/

# Méthode 2 : créer directement sur le serveur
nano .env.prod
# (coller le contenu)

# 🎉 LANCER TOUT EN UNE COMMANDE
chmod +x deploy.sh
./deploy.sh start
```

## ✅ C'est tout !

Après 5-10 minutes, vos services sont prêts :

- **🌐 Site web :** `http://votre-ip:3000`
- **🔧 Admin :** `http://votre-ip:8000/admin`
  - Email : `contact@aiunivers.ai`
  - Mot de passe : `Aiunivers2026//@`

## 📋 Commandes utiles

```bash
./deploy.sh logs      # Voir les logs
./deploy.sh health    # Vérifier l'état
./deploy.sh stop      # Arrêter
./deploy.sh restart   # Redémarrer
./deploy.sh backup    # Backup manuel
```

## 🔒 Configuration Security Groups AWS

Ouvrez les ports suivants :

| Port | Service | Source |
|------|---------|--------|
| 22   | SSH     | Votre IP uniquement |
| 80   | HTTP    | 0.0.0.0/0 |
| 443  | HTTPS   | 0.0.0.0/0 |
| 3000 | Next.js | 0.0.0.0/0 (temporaire) |
| 8000 | Django  | 0.0.0.0/0 (temporaire) |

> **Note :** En production avec Nginx, seuls les ports 80/443 devraient être publics.

## 💾 Backups

- **Automatiques :** Tous les jours à 2h00 du matin
- **Dossier :** `./backups/`
- **Rétention :** 30 jours

## 🆘 Problème ?

```bash
# Voir les logs détaillés
./deploy.sh logs

# Vérifier la santé
./deploy.sh health

# Redémarrer proprement
./deploy.sh stop
./deploy.sh start
```

Pour plus de détails, voir [README.deployment.md](./README.deployment.md)
