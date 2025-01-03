# Use Node.js 18 for building and serving
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Install Tailwind CSS and AJV globally if required
RUN npm install -g tailwindcss ajv

# Copy the application source code
COPY . .

# Build the React app
RUN npm run build

# Copy the shell script
COPY run-frontend.sh ./
RUN chmod +x run-frontend.sh

# Expose port 8080 for the web app
EXPOSE 8080

# Start the React app using the shell script
CMD ["bash", "./run-frontend.sh"]
