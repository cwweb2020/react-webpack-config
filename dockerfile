# Usa la imagen oficial de Node.js basada en Debian
FROM node:buster

# Actualiza los paquetes e instala las herramientas de compilación y dependencias necesarias
RUN apt-get update && apt-get install -y \
    autoconf \
    automake \
    build-essential \
    nasm \
    libpng-dev \
 && rm -rf /var/lib/apt/lists/*

# Crear un grupo y usuario para la app
RUN addgroup --system app && adduser --system --ingroup app app

# Establece el directorio de trabajo
WORKDIR /app/

# Copia solo los archivos de dependencias y ejecuta npm install
COPY --chown=app package*.json ./
RUN npm install && chown -R app:app node_modules

# Copia el resto del código
COPY --chown=app . .

# Exponer el puerto
EXPOSE 3000

# Cambiar al usuario no root 'app'
USER app

# Comando para iniciar la aplicación
CMD ["npm", "start"]
