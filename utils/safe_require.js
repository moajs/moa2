const fs = require('fs')

module.exports = function safe_require (path) {
  var file_path
  
  if(/\.js$/.test(path) === false) {
    file_path = path + '.js'
  }
  
  if (fs.existsSync(file_path) == true) {
    debug('safe_require ' + path + ' exist')
    require(path)
  } else {
    debug('safe_require ' + path + ' is not exist')
  }
}
