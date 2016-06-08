"use strict";

require('./init')
require('./db')

var log4js        = require('koa-log4'); 
var log           = log4js.getLogger("moa-api");
var res_api       = require('koa.res.api');

const mount_routes = require('mount-koa-routes');

const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');


// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(require('koa-static')(__dirname + '/public')));

log4js.configure('config/log4js.json', { reloadSecs: 300 });
app.use(log4js.koaLogger(log4js.getLogger("http"), { level: 'auto' }))

app.use(res_api());

app.use(views(__dirname + '/app/views', {
  extension: 'jade'
}));

// logger
app.use((ctx, next) => {
  console.log("...")
  const start = new Date();
  return next().then(() => {
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
});

// router.use('/', index.routes());
// router.use('/users', users.routes());
mount_routes(app, __dirname + '/app/routes', true);

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});

module.exports = app
