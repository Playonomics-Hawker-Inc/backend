FROM node:alpine

# Create app directory
WORKDIR /usr/src/app
ENV NODE_ENV=production
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# Copy our custom tsconfig
# where available (npm@5+)
COPY package*.json ./
COPY tsconfig*.json ./
COPY .npmrc ./
# Copy the src bundle
COPY . .

# Install dependencies
RUN npm install
RUN npm i -g @nestjs/cli


RUN npm run build


EXPOSE 6006
#The server is generated under dist as per the tsconfig, hence the command
CMD ["node", "dist/main"]