const fs = require('fs')

module.exports = function safe_require (path) {
  if (fs.existsSync(path)) {
    debug('safe_require ' + path + ' exist')
    require(path)
  } else {
    debug('safe_require ' + path + ' is not exist')
  }
}
