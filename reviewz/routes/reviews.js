var express = require('express');
var bodyParser = require('body-parser');
var Verify = require('./verify');


var reviewRouter = express.Router();

var Reviews = require('../models/reviews');

reviewRouter.use(bodyParser.json());




reviewRouter.route('/')
.get(function (req, res, next) {
    Reviews.find(req.query)
        //.populate('postedBy')
        //.populate('restaurant')
        .exec(function (err, reviews) {
        if (err)return next(err);
        res.json(result);
    });
})

//Verify.verifyOrdinaryUser, Verify.verifyAdmin,
.post( function (req, res, next) {
    Reviews.create(req.body, function (err, review) {
        if (err)return next(err);
        console.log('review created!');
        var id = review._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the review with id: ' + id);
    });
})

reviewRouter.route('/:id')
.get( function (req, res, next) {
    Reviews.findById(req.params.id)
        .populate('postedBy')
        .exec(function (err, review) {
        if (err)return next(err);
        res.json(review);
    });
})

//Verify.verifyOrdinaryUser, Verify.verifyAdmin, 
.put(function (req, res, next) {
    Reviews.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function (err, review) {
        if (err)return next(err);
        res.json(review);
    });
})


//Verify.verifyOrdinaryUser, Verify.verifyAdmin, 
.delete(function (req, res, next) {
        Reviews.findByIdAndRemove(req.params.id, function (err, resp) {
        if (err)return next(err);
        res.json(resp);
    });
});


reviewRouter.route('/:id/comment')
.get(function (req, res, next) {
    Reviews.findById(req.params.id)
        .populate('comments.postedBy')
        .exec(function (err, review) {
        if (err)return next(err);
        res.json(review.comments);
    });
})

//Verify.verifyOrdinaryUser,
.post(function (req, res, next) {
    Reviews.findById(req.params.id, function (err, review) {
        if (err)return next(err);
        req.body.postedBy = req.decoded._id;
        review.comments.push(req.body);
        review.save(function (err, review) {
            if (err)return next(err);
            console.log('Updated Comments!');
            res.json(review);
        });
    });
})




module.exports = reviewRouter;