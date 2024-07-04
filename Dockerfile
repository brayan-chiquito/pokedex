# Utiliza la imagen oficial de Node.js como imagen base
FROM node:14-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Instala un servidor web para servir la aplicación estática
RUN npm install -g serve

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 5000

# Define el comando que se ejecutará al iniciar el contenedor
CMD ["serve", "-s", "build", "-l", "5000"]
