"use strict";

var router = require('koa-router')();
const co = require('co');

// var res_api       = require('res.api');
var $ = require('mount-controllers')(__dirname).students_controller;

var $middlewares  = require('mount-middlewares')(__dirname);

// route define
router.get('/', $middlewares.check_api_token, (ctx, next) => {
  return co.wrap($.api.list)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
});

router.post('/', $middlewares.check_api_token, (ctx, next) => {
  return co.wrap($.api.create)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
});

router.get('/:student_id', $middlewares.check_api_token, (ctx, next) => {
  return co.wrap($.api.show)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
});

router.patch('/:student_id', $middlewares.check_api_token, (ctx, next) => {
  return co.wrap($.api.update)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
});

router.delete('/:student_id', $middlewares.check_api_token, (ctx, next) => {
  return co.wrap($.api.delete)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
});


module.exports = router;
