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