# Assessment API

## Introduction

> This is an API app was created for Assesment test using Nodejs, Express and Mysql.


## Installation

> Clone this repository and run

```bash
npm install

```
and set mysql database using dump folder

```

Then run:

```bash
npm run dev
```

goto your browser

and visit localhost:3002 

Note:

You should have mysql connection and change .env.dev as per your credentials



## Sample API Calls


#### /api/users/create
* `POST` : params are name, email, password, type, age, salary

#### /api/users/update
* `POST` : params are id, name, email, password, type, age, salary

#### /api/users/login
* `POST` : params are email, password

#### /api/users/list
* `GET` : params are min, max(limits)