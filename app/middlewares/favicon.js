/*!
 * Moajs Middle
 * Copyright(c) 2015-2019 Alfred Sang <shiren1118@126.com>
 * MIT Licensed
 */
require('../../config/log.js')

const path = require('path')
const favicon = require('koa-favicon')

// 检查用户会话
module.exports = favicon(path.join(__dirname, '../../public/favicon.ico'))