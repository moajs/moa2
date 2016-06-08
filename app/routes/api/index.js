var router = require('koa-router')();

router.get('/', function (ctx, next) {
  ctx.body = 'this a /api response!';
});

module.exports = router;
