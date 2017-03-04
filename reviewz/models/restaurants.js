// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var menuItemSchema = new Schema({
    name : String,
    price: Currency,
    image: String,
    description: String
});

// create a schema
var restoSchema = new Schema({
    name: {
        type: String,
        required: true,
        //unique: true //to be determined
    },
    image:{
        type: String,
        required: true,
    },
    tags:[
        String
    ],
    tagline:{
        type: String,
        default: ""
    },
    description: {
        type: String,
        required: true
    },
    menu:[menuItemSchema],
    loc:{
        lat: Number, 
        lng: Number
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Restaurants = mongoose.model('Restaurant', restoSchema);

// make this available to our Node applications
module.exports = Restaurants;