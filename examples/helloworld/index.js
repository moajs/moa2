var app = require('../../')(__dirname + '/config')

console.dir(global.$middlewares)

app.start(4000);