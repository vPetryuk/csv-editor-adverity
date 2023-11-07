# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent

# add app
COPY . ./

EXPOSE 3000
ENV PORT 3000

# start app
CMD ["yarn", "dev"]