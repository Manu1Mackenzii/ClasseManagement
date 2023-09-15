# Utilisez l'image Node.js comme base pour construire l'application Angular
FROM node:14 as build-stage

# Créez le répertoire de travail de l'application
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez tous les fichiers de l'application dans le conteneur
COPY . .

# Générez l'application Angular pour la production
RUN npm run build

# Utilisez un serveur web léger pour servir l'application Angular
FROM nginx:alpine

# Copiez les fichiers de l'étape de construction dans le répertoire de l'application NGINX
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exposez le port sur lequel NGINX écoute
EXPOSE 80

# Commande pour démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
