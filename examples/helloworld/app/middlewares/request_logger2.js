/*!
 * Moajs Middle
 * Copyright(c) 2015-2019 Alfred Sang <shiren1118@126.com>
 * MIT Licensed
 */


// 检查用户会话
module.exports = (ctx, next) => {
  debug('...')
  const start = new Date()
  return next().then(() => {
    const ms = new Date() - start
    debug(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
}