/*
 * @Author: maskMan
 * @LastEditTime: 2023-04-23 19:13:11
 * @Descripttion:初始化获取目录
 */
const fs = require('fs')
const path = require('path')
const basePath = path.join(__dirname, '../node_modules')
const confName = 'res.config.js'
resCount = 1
/**
 * @description: 获取全部路径初始启动
 * @return {object}路径名和文件名列表
 */
const dirList = (function () {
  const result = fs.readdirSync(basePath)
  const dirList = result.filter((v) => !new RegExp(/(\.json$|copy-dir)/).test(v))
  return dirList
})()
module.exports = {
  dirList,
  confName,
  basePath,
}
