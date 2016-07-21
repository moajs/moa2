'use strict'

require('./init')
require('./db')
require('./config/global')

const path = require('path')
const Koa = require('koa')
const mountRoutes = require('mount-koa-routes')
const $middlewares = require('mount-middlewares')(__dirname)

const app = new Koa()

// middlewares
app.use($middlewares.compress)
app.use($middlewares.bodyparser)
app.use($middlewares.json)
app.use($middlewares.serve)
app.use($middlewares.api)
app.use($middlewares.views)
app.use($middlewares.favicon)

// for production
if (process.env.NODE_ENV === 'production') {
  app.use($middlewares.log4js())

  // mount routes from app/routes folder
  mountRoutes(app, path.join(__dirname, 'app/routes'), false)
} else if (process.env.NODE_ENV === 'test') {
  // for test
  console.log('test')

  // mount routes from app/routes folder
  mountRoutes(app, path.join(__dirname, 'app/routes'), true)
} else {
  // default for development
  app.use($middlewares.logger)

  // request logger
  app.use($middlewares.request_logger)

  // mount routes from app/routes folder
  mountRoutes(app, path.join(__dirname, 'app/routes'), true)
}

// response
app.on('error', function (err, ctx) {
  console.log(err)
})

module.exports = app
