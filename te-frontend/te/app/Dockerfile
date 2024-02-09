# Set base image to create the image for react
FROM node:18-alpine3.18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependecies
RUN npm install

# copy the rest of the files to the workind directory
COPY . .
