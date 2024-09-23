# Usa la imagen oficial de Node.js como base
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias primero para aprovechar la caché de Docker
COPY package*.json ./

# Instala las dependencias de producción
RUN npm ci --only=production

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila la aplicación
RUN npm run build

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "start"]
