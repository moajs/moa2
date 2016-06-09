#!/usr/bin/env node

'use strict'

// 完成发货单，并生成对应账单
require('../db.js')

var Test = require('../app/models/user')

Test.find({}, function (err, docs) {
  if (err) console.log(err)
  console.dir(docs)
  process.exit()
})
