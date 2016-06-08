"use strict";

var router = require('koa-router')();
const co = require('co');

var $middlewares  = require('mount-middlewares')(__dirname);

// core controller
var $ = require('mount-controllers')(__dirname).cups_controller;

/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /cups[/]        => cup.list()
 *  GET    /cups/new       => cup.new()
 *  GET    /cups/:id       => cup.show()
 *  GET    /cups/:id/edit  => cup.edit()
 *  POST   /cups[/]        => cup.create()
 *  PATCH  /cups/:id       => cup.update()
 *  DELETE /cups/:id       => cup.destroy()
 *
 */

router.get('/new', $.new); 
 
router.get('/:id/edit', $.edit);

router.get('/', $.list);

router.post('/', $.create);

router.get('/:id', $.show);

router.patch('/:id', $.update);

router.delete('/:id', $.destroy);

// -- custom routes




module.exports = router;