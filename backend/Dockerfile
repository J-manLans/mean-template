FROM node:22

# Set the working directory inside the container to /app
# All following commands will be executed in this directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache for npm install
COPY package*.json ./
RUN npm install

# Copy the rest of your app’s source code
COPY . .

EXPOSE 3000

CMD ["npx", "nodemon", "index.js"]
