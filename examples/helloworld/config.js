module.exports = {  
  home: __dirname,
  middlewares:[
    'compress',
    'bodyparser',
    'json',
    'serve',
    'api',
    'views',
    'favicon'
  ],
  
  routes:[{
    path: __dirname,
    folder: 'app/routes'
  }]


}