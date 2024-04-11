# Use an official Node.js runtime as a parent image
FROM node:20.12.0

# Set the working directory in the container
WORKDIR /community-v3

# Copy the current directory contents into the container at /community-v3/Client
COPY . .

# Install dependencies using npm ci
RUN npm ci

WORKDIR /community-v3/Client

# Build the application
RUN npm run docker:setup

# Command to run your application
CMD ["npm", "start"]
