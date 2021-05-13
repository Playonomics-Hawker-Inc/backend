## Bootstrap dependencies

# Dependencies

yarn add @nestjs/config @nestjs/mongoose @nestjs/passport @nestjs/platform-express aws-sdk bcryptjs multer multer-s3 passport passport-jwt helmet

## PRE REQUISITE (For local only)

docker network create -d bridge playonomics_net

# ** ------------------------------ **

## EUREKA - Discovery Server

# ** ------------------------------ **

# DEV

docker build -t playonomics/eureka .
docker container run -p 1111:1111 -d --rm --name pleureka --network playonomics_net playonomics/eureka

# PROD

# Enironment variables

AWS_EUREKA_HOSTNAME = eureka.playonomics-dev.com
AWS_EUREKA_PORT = 1111
AWS_EUREKA_USER = playonomics
AWS_EUREKA_PASSWORD = playonomics

# Private DNS

    eureka.playonomics-dev.com

docker build -f Dockerfile.production -t playonomics/eureka .
docker container run -p 1111:1111 -d --rm --name hfeureka playonomics/eureka

# ** ------------------------------ **

## GATEWAY - Gateway Server

# ** ------------------------------ **

# DEV - Config

docker build -t playonomics/gatwway .
docker container run -p 8080:8080 -d --rm --name plgateway --network playonomics_net playonomics/gatwway

# PROD - Config

# Enironment variable

AWS_EUREKA_HOSTNAME = eureka.playonomics-dev.com
AWS_EUREKA_PORT = 1111
AWS_EUREKA_USER = playonomics
AWS_EUREKA_PASSWORD = playonomics
AWS_GATEWAY_PORT = 8080

# Private DNS

    gateway.playonomics-dev.com

docker build -f Dockerfile.production -t playonomics/gateway .
docker container run -p 8080:8080 -d --rm --name hfgatwway playonomics/gateway

# ** ------------------------------ **

# AUTH

# ** ------------------------------ **

# Private DNS

    auth.playonomics-dev.com

docker build -t playonomics/auth .
docker container run -p 6006:6006 -d --rm --name plauth playonomics/auth

# ** ------------------------------ **

# ADMIN

# ** ------------------------------ **

# Private DNS

    admin.playonomics-dev.com

docker build -t playonomics/admin .
docker container run -p 6005:6005 -d --rm --name plauth playonomics/admin

docker run -it --rm -d --name verdaccio -p 4873:4873 verdaccio/verdaccio
