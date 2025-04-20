FROM node:18

# Install LibreOffice
RUN apt-get update && apt-get install -y libreoffice

# Create app directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose the app
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
