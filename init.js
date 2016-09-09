'use strict'

require('./config/global')

const fs = require('fs')
const path = require('path')
const logPath = path.join($config.home, 'logs')

/**
 * 创建log目录
 */
function _createLogDirectory (logPath) {
  var isExist = fs.existsSync(logPath)

  if (isExist !== true) {
    log('log_path is not exist, create folder:' + logPath)
    fs.mkdirSync(logPath)
  } else {
    log('log_path is exist, no operation!')
  }
}

function main () {
  _createLogDirectory(logPath)
}

// 程序入口
main()
