'use strict'

const fs = require('fs')
const logPath = 'logs'

/**
 * 创建log目录
 */
function _createLogDirectory (logPath) {
  var isExist = fs.existsSync(logPath)

  if (isExist !== true) {
    console.log('log_path is not exist, create folder:' + logPath)
    fs.mkdirSync(logPath)
  } else {
    console.log('log_path is exist, no operation!')
  }
}

function main () {
  _createLogDirectory(logPath)
}

// 程序入口
main()
