# My first REST-api

This REST-api is created for being used together with React project.

## Introduction
Welcome to my REST-api! This documentation should help you familiarise yourself with the resources available and how to consume them with HTTP requests. Read through the getting started section before you dive in.

## Dependencies
* **Mongoose** and **Mongo** are used for storing data;
* **Jsonwebtoken** - JWT is used to securely transmitting information between client and server;
* **Cookie-parser** - Cookie-parser is used for storing the JWT information;
* Other.

## Getting started
Let's make our first API request to the REST-api!

In the example below, we're trying to get information about the REST-api:

```https://arcane-retreat-44164.herokuapp.com/api/test```

Here is the response we get:

```
{
    "name": "rest-api",
    "version": "1.0.0",
    "description": "REST-api for back-end of React project",
    "main": "index.js"
}
```

If your response looks slightly different don't panic. This is probably because more data has been added to the API since I made this documentation.

## Base URL
The Base URL is the root URL for all of the API, if you ever make a request to the API and you get back a 404 NOT FOUND response then check the Base URL first.

The Base URL for the API is:

```https://arcane-retreat-44164.herokuapp.com/api/```

The documentation below assumes you are prepending the Base URL to the endpoints in order to make requests.

## Authentication
This API isn't open API. Authentication is required to store and get data. You can use the connected REACT-app to make registration and sign in. This also means that I've limited what you can do. If you find a mistake, then just write an issue.

# Endpoints Users

* ```/users/register``` -- signing up;
* ```/users/login``` -- signing in;
* ```/users/logout``` -- logging out;

## Register User
Signs up user and returns the registered data as json.

### URL
```/users/register```

### Method:
```POST```

### URL Params

Required:

```name``` = [string] -- The names of the person (Space between the names is required);

```email``` = [string] -- The email of the person is required and must be unique;

```username``` = [string] -- The username of the person is required and must be unique, also there is a minimum length of 5 chars, allowed are latin letters and numbers;

```password``` = [string] -- The password of the person is required and must be unique, also there is a minimum length of 5 chars, allowed are latin letters and numbers;

### Success Response:

Code: 200
Content: 
``` 
{ 
"email": "myemail@email.com",
"name": "John Doe",
"username": "Johnny",
"_id": "5f1875690916010017964978" 
}
```

### Error Response:

Code: 409 CONFLICT
Content: 
```
{ 
"errors": 
    "username": "Username is already registered!"
}
```