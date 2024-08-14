

# Stage 1: Build the Angular application
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --configuration=production

# Stage 2: Serve the Angular application
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built Angular app from the build stage
COPY --from=build /app/dist/ui/browser /usr/share/nginx/html


# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
