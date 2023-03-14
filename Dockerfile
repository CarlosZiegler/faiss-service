FROM node:16-slim
WORKDIR /app
COPY package.json .
RUN npm install
COPY index.ts .
CMD ["npm", "start"]
