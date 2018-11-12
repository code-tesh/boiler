const express = require('express');

const router = express.Router();

// Import Mongo Data Model

const modelSchema = require('../models/modelSchema');


router.get('/test/:id',async (request,response) => {


    response.send(request.params.id);


});



// Boiler CRUD





module.exports = router;
