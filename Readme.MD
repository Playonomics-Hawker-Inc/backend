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

# FARGATE

# Enironment variables

AWS_EUREKA_HOSTNAME = eureka.playonomics-dev.com
AWS_EUREKA_PORT = 1111
AWS_EUREKA_USER = playonomics
AWS_EUREKA_PASSWORD = playonomics

# Private DNS

    eureka.playonomics-dev.com

docker build -f Dockerfile.production -t playonomics/eureka .
docker container run -p 1111:1111 -d --rm --name hfeureka playonomics/eureka

# EC2

# Docker build

docker build -f Dockerfile.ec2 -t playonomics/eureka-ec2 .

docker pull public.ecr.aws/l6h5v1n2/playonomics/eureka-ec2
docker container run -p 1111:1111 -d --rm --name pleureka --network playonomics_net public.ecr.aws/l6h5v1n2/playonomics/eureka-ec2

# ** ------------------------------ **

## EUREKA - Discovery End

# ** ------------------------------ **

# ** ------------------------------ ** ------------------------------ \*\*

## GATEWAY - Gateway Server - START

# ** ------------------------------ ** ------------------------------ \*\*

# DEV - Config

docker build -t playonomics/gatwway .
docker container run -p 8080:8080 -d --rm --name plgateway --network playonomics_net playonomics/gatwway

# Fargate - Config

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

# EC2

docker build -f Dockerfile.ec2 -t playonomics/gateway-ec2 .
docker pull public.ecr.aws/l6h5v1n2/playonomics/gateway-ec2
docker container run -p 8080:8080 -d --rm --name plgateway --network playonomics_net public.ecr.aws/l6h5v1n2/playonomics/gateway-ec2

# ** ------------------------------ ** ------------------------------ \*\*

## GATEWAY - Gateway Server - END

# ** ------------------------------ ** ------------------------------ \*\*

# ** ------------------------------ ** ------------------------------ \*\*

## SESSION - Sesssion Store - START

# ** ------------------------------ ** ------------------------------ \*\*

# EC2

docker build -f Dockerfile.ec2 -t playonomics/session-ec2 .
docker pull public.ecr.aws/l6h5v1n2/playonomics/session-ec2
docker container run -p 8000:8000 -d --rm --name plsession --network playonomics_net public.ecr.aws/l6h5v1n2/playonomics/session-ec2

# ** ------------------------------ ** ------------------------------ \*\*

## SESSION - Sesssion End - END

# ** ------------------------------ ** ------------------------------ \*\*

# ** ------------------------------ **

# AUTH

# ** ------------------------------ **

# Enironment variables

PORT=6006
EUREKA_URI = http://playonomics:playonomics@eureka.playonomics-dev.com:1111/eureka
HOST_NAME=auth.playonomics-dev.com
APP_NAME=auth
ENABLE_HEART_BEAT=true
REGISTER_WITH_EUREKA=true

DATABASE=mongodb+srv://playonomics:playonomics@cluster0.vgnor.mongodb.net/playonomics-dev?retryWrites=true&w=majority
JWT_SECRET=sadasdc2wsdcljzcxkjaxcasjcbHxcscxzcsckjhsakcjbaskdasdasdgasdasdas
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Private DNS

    auth.playonomics-dev.com

docker build -t playonomics/auth .
docker container run -p 6006:6006 -d --rm --name plauth playonomics/auth

# EC2

# Enironment variables

docker build -f Dockerfile.ec2 -t playonomics/auth-ec2 .
docker pull public.ecr.aws/l6h5v1n2/playonomics/auth-ec2
docker container run -p 6006:6006 -d --rm --name plauth --network playonomics_net public.ecr.aws/l6h5v1n2/playonomics/auth-ec2

# ** ------------------------------ **

# ADMIN

# ** ------------------------------ **

# Enironment variables

PORT=6005
EUREKA_URI = http://playonomics:playonomics@eureka.playonomics-dev.com:1111/eureka
HOST_NAME=admin.playonomics-dev.com
APP_NAME=admin
ENABLE_HEART_BEAT=true
REGISTER_WITH_EUREKA=true

DATABASE=mongodb+srv://playonomics:playonomics@cluster0.vgnor.mongodb.net/playonomics-dev?retryWrites=true&w=majority
JWT_SECRET=sadasdc2wsdcljzcxkjaxcasjcbHxcscxzcsckjhsakcjbaskdasdasdgasdasdas
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Private DNS

    admin.playonomics-dev.com

docker build -t playonomics/admin .
docker container run -p 6005:6005 -d --rm --name plauth playonomics/admin

docker pull verdaccio/verdaccio
docker run -it --rm -d --name verdaccio -p 4873:4873 verdaccio/verdaccio
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio

# EC2

# Enironment variables

docker build -f Dockerfile.ec2 -t playonomics/admin-ec2 .
docker image tag public.ecr.aws/f1c3k5e1/playonomics/admin-ec2:latest playonomics/admin-ec2:latest
docker container run -p 6005:6005 -d --rm --name pladmin --network playonomics_net playonomics/admin-ec2

## Rabbit MQ

docker-compose up -d

# Redis

## Commands

docker-compose up -d
docker exec -it playonomics_redis sh

- redis-cli
- auth

server
{
listen 80;
listen [::]:80;
server_name playonomics-api.hawkerlabs.com www.playonomics-api.hawkerlabs.com;

    location /
    {
        proxy_pass http://127.0.0.1:7070;
    }

}
sudo service nginx status
sudo service nginx restart

sudo service nginx start
sudo service nginx stop

## TODO

The current architecture is not a strictly event based microservices pattern, in future each micro service will operate in their on their own sandbox,
with their own db, and with a rabbitmq exchange based broker service.

# PORTS

admin - 6005
auth - 6006s
experiences - 6001
cart-order - 6002

yarn add mongoose passport passport-jwt playonomics-lib bcryptjs @nestjs/config @nestjs/mongoose @nestjs/passport

docker stop pleureka
docker stop plgateway
docker stop plsession
docker stop plauth

## Build (Backend)

docker build -f Dockerfile.ec2 -t playonomics/gateway-ec2 .
docker build -f Dockerfile.ec2 -t playonomics/session-ec2 .
docker build -f Dockerfile.ec2 -t playonomics/auth-ec2 .
docker build -f Dockerfile.ec2 -t playonomics/admin-ec2 .
docker build -f Dockerfile.ec2 -t playonomics/experiences-ec2 .
docker build -f Dockerfile.ec2 -t playonomics/cart-order-ec2 .

docker container run -p 1111:1111 -d --rm --name pleureka --network playonomics_net public.ecr.aws/l6h5v1n2/playonomics/eureka-ec2
docker container run -p 8080:8080 -d --rm --name plgateway --network playonomics_net public.ecr.aws/l6h5v1n2/playonomics/gateway-ec2
docker container run -p 8000:8000 -d --rm --name plsession --network playonomics_net public.ecr.aws/l6h5v1n2/playonomics/session-ec2
docker container run -p 6006:6006 -d --rm --name plauth --network playonomics_net public.ecr.aws/l6h5v1n2/playonomics/auth-ec2
docker container run -p 6005:6005 -d --rm --name pladmin --network playonomics_net public.ecr.aws/l6h5v1n2/playonomics/admin-ec2
docker container run -p 6001:6001 -d --rm --name plexperiences --network playonomics_net public.ecr.aws/l6h5v1n2/playonomics/experiences-ec2
docker container run -p 6002:6002 -d --rm --name plcart-order --network playonomics_net public.ecr.aws/l6h5v1n2/playonomics/cart-order-ec2

## Build (Frontend)

docker build -f Dockerfile.ec2 -t playonomics/admin .
docker container run -p 3001:3000 -d --rm --name admin public.ecr.aws/l6h5v1n2/playonomics/admin

docker build -f Dockerfile.ec2 -t playonomics/ui .
docker container run -p 5000:3000 -d --rm --name ui public.ecr.aws/l6h5v1n2/playonomics/ui

docker container run -p 5000:5000 -d --rm --name ui playonomics/ui

server
{
listen 80;
listen [::]:80;
server_name pladmin.hawkerlabs.com www.pladmin.hawkerlabs.com;

    location /
    {
        proxy_pass http://127.0.0.1:3001;
    }

}

server
{
listen 80;
listen [::]:80;
server_name playonomics.hawkerlabs.com www.playonomics.hawkerlabs.com;

    location /
    {
        proxy_pass http://127.0.0.1:5000;
    }

}
