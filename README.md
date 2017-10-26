# TTT Project

  - A front end which accepts a number input N with a Submit button
  - On entering a value and pressing submit, a request should be sent to the backend which fetch a file hosted at http://terriblytinytales.com/test.txt. It return the top N most frequently occurring words in this file.


You can also:
  - Specify if you want to consider the stop words in the calculation or ignore them using a checkbox in the frontend.
  - A predefined set of stop is used in the tool.

### Tech

TTT project uses the following technologies:

* [ReactJS] 
* [node.js] 
* [Express] 
* [jQuery] 
* [underscore] 

### Installation

It requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server. It will run on port 8080.

```sh
$ cd backend
$ npm install 
$ node app.js
```

For ReactJs frontend do the following. By default it will run on port 3000

```sh
$ npm install 
$ npm start
```

### Deployment

For nodejs server deployment, I have used PM2. PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

```sh
$ npm install pm2 -g
$ pm2 start app.js
```

For the ReactJs app a Nginx framework is used.
Following is the nginx.conf file.
The "location @nodeapp" provides the redirect from the frontend for the API calls to the backend server.
```sh
worker_processes  1;
events {
    worker_connections  1024;
}

http {
        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        types_hash_max_size 2048;
        server {
                listen 80;
                location / {
                        root /home/ubuntu/ttt/my-app/build/;
                        try_files $uri $uri/ @nodeapp;
                        expires max;
                        access_log off;
                }

                location @nodeapp {
                        proxy_set_header X-Real-IP  $remote_addr;
                        proxy_set_header Host $host;
                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                        proxy_pass http://127.0.0.1:8080;
                }
        }
        include /etc/nginx/mime.types;
        default_type application/octet-stream;
        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;
        gzip on;
        gzip_disable "msie6";
#       include /etc/nginx/conf.d/*.conf;
#       include /etc/nginx/sites-enabled/*;
}
```

### Check

On your browser, please go to the IP: http://54.164.100.150/
