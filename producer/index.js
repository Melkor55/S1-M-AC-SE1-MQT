var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

// var userAPI = require('./APIs/userAPI');

const app = express();
app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((request, response, next) => {
    console.log('--- Middleware ---');
    next();
})
// app.use('/api', userAPI);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})