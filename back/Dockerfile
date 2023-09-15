# Utilisez l'image Node.js comme base
FROM node:14

# Créez le répertoire de travail de l'application
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez tous les fichiers de l'application dans le conteneur
COPY . .

# Exposez le port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
