FROM node:18-alpine

# Uncomment if use of process.dlopen is necessary
# apk add --no-cache libc6-compat
ENV PORT 3000
EXPOSE 3000

WORKDIR /usr/src/app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "start"]
