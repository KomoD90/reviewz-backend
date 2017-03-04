var fs = require('fs');  
var path = require('path');  
//var uid = require('uid2');  
//var mime = require('mime');  

var express = require('express');
var bodyParser = require('body-parser');
//var Verify = require('./verify');


var image = express.Router();


var TARGET_PATH = path.resolve(__dirname, '../writable/');  
var IMAGE_TYPES = ['image/jpeg', 'image/png']; 