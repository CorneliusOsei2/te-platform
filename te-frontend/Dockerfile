# Use an official Node.js image as a base
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build


# # Use nginx as the web server for serving the React app
# FROM nginx:alpine

# # Copy the built React app from the previous stage to the nginx html directory
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 3000
# EXPOSE 3000

# # Command to run nginx when the container starts
# CMD ["nginx", "-g", "daemon off;"]
