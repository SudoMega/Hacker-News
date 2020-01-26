# Hacker News Feed

This App recollects information from Hacker News and saves it in a mongoDB. The client shows the news and the server manage the data.

For demostration purposes, the app is working in the EC2 Instance http://54.242.216.106/

### Prerequisites

To run the app you will need Docker and Docker-compose

You will also need node.js, npm and angular CLI

### Installing

Clone this repo, open the terminal in the root of the downloaded files and execute the following commands.

```
docker-compose build

docker-compose up
```

The Front-end, Back-end and MongoDB should be running in the terminal.

Now you can access the client and the server in their respective ports 80 and 4000.

To populate the database for the first time you need to connect to the server, if you have Docker ToolBox like me, access the container on

```
http://192.168.99.100:4000/init
```
Otherwise access on
```
http://127.0.0.1:4000/init
```

Every time you access this link, you will add the current news. Accessing this url multiple times will create duplicates, its only meant to be run one time and its not accesible by the client.

Finally, just access the url of the client, it contains all the functionality for the user, 

```
http://192.168.99.100
```
or
```
http://127.0.0.1
```

### MIT License

Copyright (c) 2020 Vicente Ternicien

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
