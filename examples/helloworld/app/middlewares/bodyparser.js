/*!
 * Moajs Middle
 * Copyright(c) 2015-2019 Alfred Sang <shiren1118@126.com>
 * MIT Licensed
 */
require('../../../../config/log.js')

const bodyparser = require('koa-bodyparser')

// 检查用户会话
module.exports = bodyparser()