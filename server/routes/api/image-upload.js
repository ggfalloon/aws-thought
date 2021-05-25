const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '');
    }
});

// image is the key!
const upload = multer({ storage }).single('image');

// instantiated service object s3 for uploading. locked version
const s3 = new AWS.S3({
    apiVersion: '2006-03-01'
})