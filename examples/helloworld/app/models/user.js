"use strict";

/**
 * Created by alfred on June 8th 2016, 8:57:06 pm.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

var userSchema = new Schema(
    {"username":"String","password":"String","avatar":"String","phone_number":"String","address":"String"}
);

var User = mongoose.model('User', userSchema);
var UserDao = new MongooseDao(User);
 
module.exports = UserDao;