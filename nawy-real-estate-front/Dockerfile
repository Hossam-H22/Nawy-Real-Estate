# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build Next.js app
RUN npm run build

# Expose frontend port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
