FROM ubuntu

RUN apt-get update
RUN apt-get install nginx -y

## Build the app

COPY . /app

WORKDIR /app

RUN apt-get install curl -y

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -

RUN apt-get install nodejs -y

RUN npm install

RUN npm run-script build

RUN cp -r dist/* /var/www/html/

WORKDIR /

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]