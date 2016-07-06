'use strict'

require('./init')
require('./db')

const path = require('path')
const Koa = require('koa')
const router = require('koa-router')()
const mountRoutes = require('mount-koa-routes')

const app = new Koa()

var $middlewares  = require('mount-middlewares')(__dirname);

// middlewares
app.use($middlewares.compress)
app.use($middlewares.bodyparser)
app.use($middlewares.json)
app.use($middlewares.serve)
app.use($middlewares.api)
app.use($middlewares.views)

// for production
if (process.env.NODE_ENV === 'production') {
  app.use($middlewares.log4js)
}

// for development
if (process.env.NODE_ENV === 'development') {
  app.use($middlewares.logger)

  // request logger
  app.use($middlewares.request_logger)
}

// for test
if (process.env.NODE_ENV === 'test') {
  console.log('test')
}

// mount routes from app/routes folder
mountRoutes(app, path.join(__dirname, 'app/routes'), false)
// app.use(router.routes(), router.allowedMethods())

// response
app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app
