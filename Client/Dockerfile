# Use an official Node.js runtime as a parent image
FROM node:22.11.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/community-v3

# Copy the current directory contents into the container at /community-v3/Client
COPY . .

# Install dependencies using npm ci
RUN npm ci

WORKDIR /usr/src/community-v3/Client

# Build the application
RUN npm run docker:setup

# Command to run your application
CMD ["npm", "start"]

# Add a health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1