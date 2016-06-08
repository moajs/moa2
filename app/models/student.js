"use strict";

/**
 * Created by alfred on June 8th 2016, 9:03:58 am.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

var studentSchema = new Schema(
    {"name":"String","password":"String"}
);

var Student = mongoose.model('Student', studentSchema);
var StudentDao = new MongooseDao(Student);
 
module.exports = StudentDao;