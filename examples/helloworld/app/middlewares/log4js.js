/*!
 * Moajs Middle
 * Copyright(c) 2015-2019 Alfred Sang <shiren1118@126.com>
 * MIT Licensed
 */
require('../../../../config/log.js')

const path = require('path')
const log4js = require('koa-log4')

// 检查用户会话
module.exports = function() {
  log4js.configure(path.join(__dirname, '../../config/log4js.json'), { reloadSecs: 300 })
  return log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' })
}