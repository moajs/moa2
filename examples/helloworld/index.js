var app = require('../../')(__dirname + '/config')

debug($config)
debug($middlewares)

app.start(4000);