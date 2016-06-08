"use strict";

/**
 * Created by alfred on June 8th 2016, 11:17:15 am.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

var bookSchema = new Schema(
    {"name":"String","password":"String"}
);

var Book = mongoose.model('Book', bookSchema);
var BookDao = new MongooseDao(Book);
 
module.exports = BookDao;