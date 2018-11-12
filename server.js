
// Require Libraries

const express = require('express');
const mongoose = require('mongoose');
var path = require('path');

// Import Keys & Settings

const keys = require('./config/keys');


// Defining APP as Express
const app = express();

// Connect to MongoDB

mongoose.connect(keys.mongoURI, {useNewUrlParser: true}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));



// Usages

const routes = require('./routes/mainRoutes');


// Base Route

app.get('/testserver', (request, response) => {

    response.json({state: 'up'})
});


//Use


app.use('/' ,routes);


// Connect Front End with Backend


app.use('/', express.static(path.join(__dirname, 'client/build')));



app.listen('8000', () => {
    console.log('BackendStarted on 8000')
});