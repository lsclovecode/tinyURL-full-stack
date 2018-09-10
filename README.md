# Shorten-URL Full Stack Application

* Developed a full stack RESTful web app using the MEAN stack (MongoDB, Express, AngularJS and Node.js) to deliver TinyURL-like URL shortening service with timestamp expiration feature.
* Improved Web App performance by implementing Redis cache layer over MongoDB and dockerized the server app to scale up the server to multiple instances.
* Deployed server containers under Nginx, gaining load balancing and reverse proxy features.
* Applied angular-chart.js to visualize the statistic data of short URL accesses including information like Country, Browser, System, etc.

# Final Webpage
![Image of 1](https://user-images.githubusercontent.com/15081532/34709608-b894a79c-f4cc-11e7-9ad4-d2f1e9156c79.png)
![Image of 2](https://user-images.githubusercontent.com/15081532/34709711-28062510-f4cd-11e7-8c5b-29aad9725b46.png)
![Image of 3](https://user-images.githubusercontent.com/15081532/34709720-34c53e6c-f4cd-11e7-91cc-4636d77a25f9.png)

# How to run ?
My whole project is running on a docker-machine.
start the docker
```
docker compose build
docker compose up
```
