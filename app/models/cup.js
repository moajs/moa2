"use strict";

/**
 * Created by alfred on June 8th 2016, 3:04:26 pm.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

var cupSchema = new Schema(
    {"name":"String","password":"String"}
);

var Cup = mongoose.model('Cup', cupSchema);
var CupDao = new MongooseDao(Cup);
 
module.exports = CupDao;