'use strict'

require('./init')
require('./db')

const path = require('path')
const log4js = require('koa-log4')
const api = require('koa.res.api')
const mountRoutes = require('mount-koa-routes')
const Koa = require('koa')
const router = require('koa-router')()
const views = require('koa-views')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')()
const logger = require('koa-logger')
const serve = require('koa-static')

const app = new Koa()

// middlewares
app.use(bodyparser)
app.use(json())
app.use(logger())
app.use(serve(path.join(__dirname, 'public')))
app.use(api())

log4js.configure(path.join(__dirname, 'config/log4js.json'), { reloadSecs: 300 })
app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }))

app.use(views(path.join(__dirname, 'app/views'), {
  extension: 'jade'
}))

// logger
app.use((ctx, next) => {
  console.log('...')
  const start = new Date()
  return next().then(() => {
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
})

// mount routes from app/routes folder
mountRoutes(app, path.join(__dirname, 'app/routes'), false)
app.use(router.routes(), router.allowedMethods())

// response
app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app
