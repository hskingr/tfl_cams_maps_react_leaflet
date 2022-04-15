FROM node as builder
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run build
ARG REACT_APP_TILE_ACCESS \
REACT_APP_N8N_PASSWORD \
REACT_APP_N8N_USER
ENV REACT_APP_TILE_ACCESS=$REACT_APP_TILE_ACCESS \
REACT_APP_N8N_PASSWORD=$REACT_APP_N8N_PASSWORD \
REACT_APP_N8N_USER=$REACT_APP_N8N_USER
FROM nginx:1.15
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build/ /usr/share/nginx/html
EXPOSE 3000 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]