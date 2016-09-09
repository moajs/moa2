var router = require('koa-router')();
// var $middlewares  = require('mount-middlewares')(__dirname);

router.get('/',  (ctx, next) => {
  console.log("../")
  return ctx.render('index', { 
    title: '欢迎使用，Moa 2 = Moajs with koa 2.x' 
  });
})

module.exports = router;
