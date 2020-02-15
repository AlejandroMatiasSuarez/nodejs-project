const express = require('express');
const bodyParser = require('body-parser');

const myApp = express();

//middlewares
myApp.use(bodyParser.urlencoded({extended: false}));
myApp.use(bodyParser.json());

//Routes
myApp.get('/test', (request, response) => {
    response.status(200).send({
        message: 'Hello World!'
    });
});

console.log('Hello World'); 