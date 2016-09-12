# 中间件

## 根据config来加载声明式中间件

```
module.exports = {  
  // db_debug: true,
  middlewares: {
    "koa-favicon": {
      "path": "sss",
      "options": {
        "maxAge": 1
      }
    },
    global: [
      'koa-favicon',
      'compress',
      'bodyparser',
      'json',
      'serve',
      'api',
      'views',
      'favicon'
    ],
  },
  
  routes:[{
    // folder: 'app/routes'
  }]
}
```

## $middlewares

默认加载moa2/app/middlewares下的中间件，通过名字即可使用

比如request_logger.js

```
/*!
 * Moajs Middle
 * Copyright(c) 2015-2019 Alfred Sang <shiren1118@126.com>
 * MIT Licensed
 */

// 检查用户会话
module.exports = (ctx, next) => {
  const start = new Date()
  return next().then(() => {
    const ms = new Date() - start
    log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
}
```


## $global_middlewares

 