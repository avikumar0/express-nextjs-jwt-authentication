# Use the official Node.js image from the Docker Hub
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install bcrypt and rebuild native bindings
# RUN npm install bcrypt
# RUN npm rebuild bcrypt --build-from-source

# Copy all files to work directory
COPY . .

# Expose port 8000
EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]
