### STAGE 1: Build ###
FROM node:12 as build
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY .npmrc package.json /usr/src/app/
RUN npm install --silent
COPY public /usr/src/app/public
COPY src /usr/src/app/src
RUN npm run build

### STAGE 2: Production Environment ###
# build for example with:
# docker build -t $TAG \
#		--build-arg GIT_COMMIT=$(git rev-parse HEAD) \
#		--build-arg GIT_VERSION="$(git log --pretty='format:%h %s' -q -1)" .
FROM nginx:stable-alpine
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000
ARG GIT_COMMIT=unknown
ARG GIT_VERSION=unknown
LABEL platform=react git.commit=$GIT_COMMIT git.version=$GIT_VERSION
CMD ["nginx", "-g", "daemon off;"]
