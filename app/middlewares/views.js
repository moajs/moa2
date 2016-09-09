/*!
 * Moajs Middle
 * Copyright(c) 2015-2019 Alfred Sang <shiren1118@126.com>
 * MIT Licensed
 */

const path = require('path')
const views = require('koa-views')

// 检查用户会话
module.exports = views(path.join($config.home, '/app/views'), {
  extension: 'jade'
})