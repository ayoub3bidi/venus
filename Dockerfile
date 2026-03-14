ARG NODE_VERSION=22-alpine3.23
ARG NGINX_VERSION=1.27-alpine

# Stage build
FROM node:${NODE_VERSION} AS website_builder

RUN npm i -g pnpm

WORKDIR /venus

COPY package.json pnpm-lock.yaml ./

ENV CI=true

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# Stage run
FROM nginx:${NGINX_VERSION} AS doc

COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY .docker/nginx/docker-entrypoint.sh /docker-entrypoint.sh

COPY --from=website_builder /venus/build/ /usr/share/nginx/html

RUN chmod +x /docker-entrypoint.sh && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD [ "nginx", "-g","daemon off;" ]
