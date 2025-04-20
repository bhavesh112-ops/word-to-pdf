FROM node:18

# Install LibreOffice
RUN apt-get update && apt-get install -y libreoffice

# Create app directory
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
