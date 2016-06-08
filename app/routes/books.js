"use strict";

const co = require('co');
const router = require('koa-router')();
const $middlewares  = require('mount-middlewares')(__dirname);

// core controller
const $ = require('mount-controllers')(__dirname).books_controller;

/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /books[/]        => book.list()
 *  GET    /books/new       => book.new()
 *  GET    /books/:id       => book.show()
 *  GET    /books/:id/edit  => book.edit()
 *  POST   /books[/]        => book.create()
 *  PATCH  /books/:id       => book.update()
 *  DELETE /books/:id       => book.destroy()
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