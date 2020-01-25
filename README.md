# Hacker News Feed

This App recollects information from Hacker News and saves it in a mongoDB. The client shows the news and the server manage the data.

### Prerequisites

To run the app you will need Docker and Docker-compose

### Installing

Clone this repo, open the terminal in the root of the downloaded files and execute the following commands.

```
docker-compose build

docker-compose up
```

The Front-end, Back-end and MongoDB shoud be running in the terminal.

Now you can access the client and the server, the client is

```
Http://localhost:4200
```
and the server
```
Http://localhost:4000
```
To populate the database for the first time you need to connect to

```
Http://localhost:4000/init
```
Every time you access this link, you will add the current news. Accessing this url multiple times will create duplicates, its only meant to be run one time and its not accesible by the user.

Finally, just access the url of the client, it contains all the functionality for the user.

```
Http://localhost:4200
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