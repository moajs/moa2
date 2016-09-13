/*!
 * Moajs Middle
 * Copyright(c) 2015-2019 Alfred Sang <shiren1118@126.com>
 * MIT Licensed
 */

const path = require('path')
const log4js = require('koa-log4')

// 检查用户会话
module.exports = function() {
  console.log(path.join($config.home, '/config/log4js.json'))
  log4js.configure(path.join($config.home, '/config/log4js.json'), { reloadSecs: 300 })
  return log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' })
}