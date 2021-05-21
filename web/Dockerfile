FROM node:16

# Cria diretorio do app
WORKDIR /app

# Instala dependencias do app
COPY package.json /app
COPY yarn.lock /app
COPY .env.local /app

RUN yarn install

# Expoe porta do app
EXPOSE 3000
CMD [ "yarn", "start" ]
