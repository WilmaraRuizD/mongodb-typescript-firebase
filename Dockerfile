FROM node:16.15.0
WORKDIR /app
COPY package*.json ./
RUN npm  install
COPY . . 

#EXPOSE 3040
CMD ["npm","start"]