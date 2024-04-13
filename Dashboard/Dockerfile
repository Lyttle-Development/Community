# Use an official Node.js runtime as a parent image
FROM node:20.12.0

# Set the working directory in the container
WORKDIR /community-v3

# Copy the current directory contents into the container at /community-v3/Dashboard
COPY . .

# Install dependencies using npm ci
RUN npm ci

WORKDIR /community-v3/Dashboard

# List environment variables
ENV NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/graphql
ENV NEXT_PUBLIC_LOGIN_URL=http://localhost:3000/auth/login
ENV NEXT_PUBLIC_LOGOUT_URL=http://localhost:3000/auth/logout
ENV NEXT_PUBLIC_LOGIN_URL_RETURN=http://localhost:3000/auth/discord
ENV NEXT_PUBLIC_CHECK_URL=http://localhost:3000/

# Build the application
RUN npm run docker:setup

# Expose the port the app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
