"use strict";

var router = require('koa-router')();
const co = require('co');

// var res_api       = require('res.api');
var $ = require('mount-controllers')(__dirname).cups_controller;

var $middlewares  = require('mount-middlewares')(__dirname);

// route define
router.get('/', $middlewares.check_api_token, $.api.list);

router.post('/', $middlewares.check_api_token, $.api.create);

router.get('/:cup_id', $middlewares.check_api_token, $.api.show);

router.patch('/:cup_id', $middlewares.check_api_token, $.api.update);

router.delete('/:cup_id', $middlewares.check_api_token, $.api.delete);


module.exports = router;
