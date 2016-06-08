"use strict";

const router = require('koa-router')();
const co = require('co');
const $middlewares  = require('mount-middlewares')(__dirname);

// core controller
const $ = require('mount-controllers')(__dirname).students_controller;

/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /students[/]        => student.list()
 *  GET    /students/new       => student.new()
 *  GET    /students/:id       => student.show()
 *  GET    /students/:id/edit  => student.edit()
 *  POST   /students[/]        => student.create()
 *  PATCH  /students/:id       => student.update()
 *  DELETE /students/:id       => student.destroy()
 *
 */

router.get('/new', (ctx, next) => {
  return co.wrap($.new)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
}); 
 
router.get('/:id/edit', (ctx, next) => {
  return co.wrap($.edit)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
}); 

router.get('/',  (ctx, next) => {
  return co.wrap($.list)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
}); 

router.post('/', (ctx, next) => {
  return co.wrap($.create)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
});

router.get('/:id', (ctx, next) => {
  return co.wrap($.show)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
});

router.patch('/:id', (ctx, next) => {
  return co.wrap($.update)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
});

router.delete('/:id', (ctx, next) => {
  return co.wrap($.destroy)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
});

// -- custom routes




module.exports = router;