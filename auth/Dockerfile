#base image
FROM node
#setup working directory
WORKDIR /app
#copy package.json
COPY ./package.json ./
#install packages
RUN npm install
#copy project files
COPY ./ ./
#set command to run when the container starts
CMD ["npm","start"]
