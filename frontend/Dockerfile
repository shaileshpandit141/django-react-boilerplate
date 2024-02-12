# Pull the official base image
FROM node:alpine


# Setting the woring directory
WORKDIR /frontend


# Copy package files
COPY package-lock.json .
COPY package.json .


# Installing dependencies
RUN npm install


# Copy project files
COPY . .


# Expose the port with 8000
EXPOSE 3000


# Run the django server
CMD [ "npm", "start" ]