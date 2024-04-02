# Use an official Node.js LTS (Long Term Support) image as the base image
FROM node:14.18.1-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --quiet

# Copy the rest of the application code into the container
COPY . ./

# Build the React application
RUN npm run build

# Use a lightweight image for the production environment
FROM nginx:1.21.3-alpine

# Copy the built React application from the build stage to the NGINX web root directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to start NGINX server when the container starts
CMD ["nginx", "-g", "daemon off;"]
