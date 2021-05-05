## Bootstrap dependencies

# Dependencies

yarn add @nestjs/config @nestjs/mongoose @nestjs/passport @nestjs/platform-express aws-sdk bcryptjs multer multer-s3 passport passport-jwt helmet

## PRE REQUISITE

docker network create -d bridge playonomics_net

## EUREKA - Discovery Server

# DEV

docker build -t playonomics/eureka .
docker container run -p 1111:1111 -d --rm --name pleureka --network playonomics_net playonomics/eureka

# PROD

docker build -f Dockerfile.production -t playonomics/eureka .
docker container run -p 1111:1111 -d --rm --name hfeureka playonomics/eureka

## GATEWAY - Gateway Server

# DEV

docker build -t playonomics/gatwway .
docker container run -p 8080:8080 -d --rm --name plgateway --network playonomics_net playonomics/gatwway

# PROD

docker build -f Dockerfile.production -t playonomics/gateway .
docker container run -p 8080:8080 -d --rm --name hfgatwway playonomics/gateway

# AUTH

docker build -t playonomics/auth .
docker container run -p 6006:6006 -d --rm --name plauth playonomics/auth

docker run -it --rm -d --name verdaccio -p 4873:4873 verdaccio/verdaccio
