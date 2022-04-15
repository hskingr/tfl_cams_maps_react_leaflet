FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV REACT_APP_TILE_ACCESS="" \
REACT_APP_N8N_PASSWORD="" \
REACT_APP_N8N_USER=""
CMD ["npm", "start"]