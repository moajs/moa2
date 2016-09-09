require('log1')(true)

global.current_path = process.cwd()
global.Promise = require('bluebird')
global.debug = require('debug')('moa2')

global.safe_require = require('../utils/safe_require')


global.router = require('koa-router')