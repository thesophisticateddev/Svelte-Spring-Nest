# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Create and set the working directory
WORKDIR /app

# Copy the application code
COPY . .

# Install dependencies and build the app
RUN npm install
RUN npm run build

# Expose port 5173
EXPOSE 5173

# Define the start command (adjust as needed)
CMD ["npx", "serve", "-s", "build", "-l", "5173"]
