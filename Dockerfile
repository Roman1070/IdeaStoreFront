FROM node:current-alpine3.20 AS builder

COPY package.json package-lock.json ./
RUN npm install --only=prod&& mkdir /var/app && mv ./node_modules ./var/app

WORKDIR /var/app

COPY . .

RUN npm run build


FROM nginx:1.27.3-alpine
COPY --from=builder /var/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

