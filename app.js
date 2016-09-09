'use strict'

const path = require('path')
const extend = require('extend')
const mountRoutes = require('mount-koa-routes')
const Koa = require('koa')

const app = new Koa()

module.exports = function (config) {
  global.$config = config
  console.log('Configuration = ' + JSON.stringify(config, null, 4))
  console.log('NODE_ENV = ' + process.env.NODE_ENV)
  
  require('./init')
  require('./db')
  require('./config/global')
  
  safe_require(path.join($config.home, './init'))
  safe_require(path.join($config.home, './db'))
  safe_require(path.join($config.home, './config/global'))

  global.$middlewares = require('mount-middlewares')(__dirname)
  extend(global.$middlewares, require('mount-middlewares')(config.home))

  debug('global.$middlewares')
  debug(global.$middlewares)

  // middlewares  
  config.middlewares.map(function (middleware) {
    app.use($middlewares[middleware])
  })
  
  // for production
  if (process.env.NODE_ENV === 'production') {
    app.use($middlewares.log4js())

    config.routes.map(function (route) {
      // mount routes from app/routes folder
      if (route.path) {
        mountRoutes(app, path.join(route.path, route.folder), false)
      } else {
        mountRoutes(app, path.join(__dirname, route.folder), false)
      }
    })
  } else if (process.env.NODE_ENV === 'test') {
    // for test
    console.log('test')

    // mount routes from app/routes folder
    config.routes.map(function (route) {
      // mount routes from app/routes folder
      if (route.path) {
        mountRoutes(app, path.join(route.path, route.folder), true)
      } else {
        mountRoutes(app, path.join(__dirname, route.folder), true)
      }
    })
  } else {
    // default for development
    app.use($middlewares.logger)

    // request logger
    app.use($middlewares.request_logger)

    console.log(config.routes)
    // mount routes from app/routes folder
    config.routes.map(function (route) {
      console.log(path.join(route.path, route.folder))
      // mount routes from app/routes folder
      if (route.path) {
        mountRoutes(app, path.join(route.path, route.folder), true)
      } else {
        mountRoutes(app, path.join(__dirname, route.folder), true)
      }
    })
  }

  // response
  app.on('error', function (err, ctx) {
    console.log(err)
  })
  
  app.start = app.listen
  
  return app
}