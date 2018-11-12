const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const modelSchema = new Schema({

    _id:String,

    // status:String,
    // domain:String,

});


module.exports = mongoose.model('Event' , modelSchema);