# Use an official Node.js runtime as a parent image
FROM node:20.17.0

# Set the working directory in the container
WORKDIR /usr/src/community-v3

# Copy the current directory contents into the container at /community-v3/Dashboard
COPY . .

# Install dependencies using npm ci
RUN npm ci

WORKDIR /usr/src/community-v3/Dashboard

# Build the application
RUN npm run docker:setup

# Expose the port the app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
