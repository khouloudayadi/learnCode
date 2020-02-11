FROM node:10

WORKDIR C:/Users/Client/Desktop/code1

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]