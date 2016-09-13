module.exports = {  
  // db_debug: true,
  build_ins:[
    'compress',
    'bodyparser',
    'json',
    'serve',
    'api',
    'views',
    'favicon'
    // ,'log4js'
  ],
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