// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

var reviewSchema = new Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type : String,
        required:true
    },
    review:{
        type : String,
        required:true
    },
    images:[String],
    comments:[commentSchema]

}, {
    timestamps: true
});