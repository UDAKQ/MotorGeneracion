FROM node:16

# Create app directory
WORKDIR /src/app

# Install app dependencies
COPY ./ ./
RUN npm install 
#Expose ports
EXPOSE 3000
CMD ["npm", "run", "start"]