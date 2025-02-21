const mongoose = require('mongoose');
const config = require('config'); //npm package
const debug = require("debug")("development:mongoose");

mongoose.connect(`${config.get('MONGODB_URI')}/scatch`)
    .then(function() {
        debug('Connected to MongoDB');  // This should log if DEBUG is set correctly
    })
    .catch(function(err) {
        debug('Could not connect to MongoDB', err);
    });

module.exports = mongoose.connection;
