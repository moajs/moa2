# 中间件

moa2支持2种Koa 2.x中间件

- 根据config来加载声明式中间件
- 指定加载目录，用于无参数或固定参数的中间件

## 根据config来加载声明式中间件

先看一下配置文件

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


首先，[koa-favicon](https://github.com/koajs/favicon/tree/v2.x)是package.json里的一个包名称

```
"koa-favicon": "^2.0.0",
```

后面的即该中间件的参数，有path和options参数。这种声明方式是非常好用的，尤其是在配置文件里。


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

对于已有的中间件也可以这样玩，比如bodyparser.js

```
/*!
 * Moajs Middle
 * Copyright(c) 2015-2019 Alfred Sang <shiren1118@126.com>
 * MIT Licensed
 */

const bodyparser = require('koa-bodyparser')

// 检查用户会话
module.exports = bodyparser()
```

约定好即可，不需要走配置，调用更加简便。


## $global_middlewares

存放所有全局使用的中间件
 