# Use an official Node.js runtime as a parent image
FROM node:20.11.0

# Set the working directory in the container
WORKDIR /home/server/server/bots/Community/Dashboard

# Install app dependencies using npm ci
RUN npm ci

# Expose the port the app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
