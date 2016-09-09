'use strict'

const path = require('path')
const extend = require('extend')
const mountRoutes = require('mount-koa-routes')
const Koa = require('koa')

const app = new Koa()

module.exports = function (config) {
  global.$config = config
  
  require('./init')
  require('./db')
  require('./config/global')
  
  debug('Configuration = ' + JSON.stringify(config, null, 4))
  debug('NODE_ENV = ' + process.env.NODE_ENV)
  
  safe_require(path.join($config.home, './init'))
  safe_require(path.join($config.home, './db'))
  safe_require(path.join($config.home, './config/global'))

  global.$middlewares = require('mount-middlewares')(__dirname)
  extend(global.$middlewares, require('mount-middlewares')(config.home))

  debug('global.$middlewares')
  debug(global.$middlewares)
  
  global.$models = require('mount-models')($config.home + '/');

  debug('global.$models')
  debug(global.$models)
  
  global.$controllers = require('mount-controllers')($config.home + '/app/');

  debug('global.$controllers')
  debug(global.$controllers)
  
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
    debug('test')

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

    debug(config.routes)
    // mount routes from app/routes folder
    config.routes.map(function (route) {
      debug(path.join(route.path, route.folder))
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
    debug(err)
  })
  
  app.start = app.listen
  
  return app
}