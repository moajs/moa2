/*!
 * Moajs Middle
 * Copyright(c) 2015-2019 Alfred Sang <shiren1118@126.com>
 * MIT Licensed
 */

const path = require('path')
const serve = require('koa-static')

// 检查用户会话
module.exports = serve(path.join($config.home, '/public'))