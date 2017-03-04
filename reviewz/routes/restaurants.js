var express = require('express');
var bodyParser = require('body-parser');
var Verify = require('./verify');
var config = require('../config');

var fs = require('fs');
var path = require('path');
var uid = require('uid');


var restoRouter = express.Router();

var Restaurants = require('../models/restaurants');

restoRouter.use(bodyParser.json());



restoRouter.route('/')

    .get(function (req, res, next) {
        console.log(req.query);
        Restaurants.find(req.query, function (err, resto) {
            if (err) return next(err);
            res.json(resto);
        });
    })

    //Verify.verifyOrdinaryUser, Verify.verifyAdmin // to be determined
    .post(function (req, res, next) {
        //save image here
        var imagePath = saveImage(req.body.image);
        var resto = req.body;
        resto.image = imagePath;
        Restaurants.create(resto, function (err, resto) {
            if (err) return next(err);
            console.log('resto created!');
            var id = resto._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the resto with id: ' + id);
        });
    })

    //Verify.verifyOrdinaryUser, Verify.verifyAdmin // to be determined
    .delete(function (req, res, next) {
        Restaurants.remove({}, function (err, resto) {
            if (err) return next(err);
            res.json(resto);
        });
    });


restoRouter.route('/:id')

    .get(function (req, res, next) {
        Restaurants.findById(req.params.id, function (err, resto) {
            if (err) return next(err);
            res.json(resto);
        });
    })

    //Verify.verifyOrdinaryUser, Verify.verifyAdmin,
    .put(function (req, res, next) {
        Restaurants.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
                new: true
            }, function (err, resto) {
                if (err) return next(err);
                res.json(resto);
            });
    })

    //Verify.verifyOrdinaryUser, Verify.verifyAdmin,
    .delete(function (req, res, next) {
        Restaurants.findByIdAndRemove(req.params.id, function (err, resto) {
            if (err) return next(err);
            res.json(resto);
        });
    });


module.exports = restoRouter;




function saveImage(image) {
    //get image ext
    var imageExt = getExtImage(image);

    //generate image name
    var imageName = generateName() + imageExt;

    //get path + image name
    var imagePath = GetPath() + imageName;

    //save image
    fs.writeFile(imagePath, image.$ngfDataUrl.replace("data:image/" + imageExt + ";base64,", ""), 'base64', function (err, res) {
        if (err) return next(err);
    });

    //return path
    return "/images/" + imageName;
}


function generateName() {
    //enhancment
    //remove hard coded lenth and get from config file
    return uid(10) ;
}

function GetPath() {
    if(config.env == "dev"){
        return "/Users/kareemsakr/Desktop/meanTodo yo/app/images/";
    }else{
        return  path.resolve() + "/public/images/";
    }
    
}

function getExtImage(image) {
    return '.' + image.$ngfDataUrl.split("data:image/")[1].split(";")[0];
}