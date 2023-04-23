/*
 * @Author: maskMan
 * @LastEditTime: 2023-04-23 20:34:15
 * @Descripttion:读取资源包文件
 */
const fs = require('fs')
const path = require('path')
const copydir = require('copy-dir')
const nodeCmd = require('child_process')
const { confName, basePath, dirList } = require('./initDir')
const { spaceSmall, space, resDesc, resErrMsg, noConfErrMsg, icons, emptyErrMsg } = require('./toast')
/**
 * @description: 读取配置文件
 * @param {string} dir
 * @param {string} resName
 * @return {ResRecord}
 */
function _readConf(resName) {
  try {
    const dirPath = path.join(basePath, resName, confName)
    const dir = path.join(basePath, resName)
    if (!dir) {
      return { conf: null, name: resName, noFind: true, err: resErrMsg }
    }
    if (fs.existsSync(dirPath)) {
      return { conf: require(dirPath), name: resName, noFind: false, err: null }
    } else {
      return { conf: null, name: resName, noFind: false, err: noConfErrMsg }
    }
  } catch (error) {
    return { conf: null, name: resName, noFind: false, err: noConfErrMsg }
  }
}
/**
 * @description: 配置解析到文本
 * @param {ResRecord} record
 * @return {string}
 */
function _resoveConf(record) {
  let { conf, name, noFind, err } = record
  if (noFind) {
    return `${icons}${space}资源 --${name}${space}${err}`
  }
  const text = [`${icons}${space}资源[${resCount}] copy --${name}${space}`]
  if (conf) {
    for (const key in conf) {
      if (key != 'name') {
        text.push(`${resDesc[key]}-${conf[key]}`)
      }
    }
    resCount++
    return text.join(spaceSmall)
  }
  text.push(err)
  resCount++
  return text.join(' ')
}
/**
 * @description:执行命令
 * @return {}
 */
function linkCmdExe(resName) {
  let currList = ['npm link', ...dirList]
  if (resName) {
    currList.push(resName)
  }
  console.log('🚀  currList', currList)
  currList = Array.from(new Set(currList))
  const cmd = currList.join(' ')
  console.log('🚀  cmd', cmd)
  var cmdPath = resName ? process.argv[1].replace(/cli\.js$/, '') : process.cwd()
  nodeCmd.exec(cmd, { cwd: cmdPath })
}
/**
 * @description: 获取资源包配置描述
 * @param {string} dir
 * @param {string} resName
 * @return {string}
 */
function readResRecord(resName) {
  const record = _readConf(resName)
  const tem = _resoveConf(record)
  return tem
}
/**
 * @description: 读取指定路径下所有资源名字
 * @param {string} dir 目录名
 * @return {string[]}资源包名数组
 */
function readReslist() {
  const currDir = basePath
  let result = fs.readdirSync(currDir)
  const resList = result.filter((v) => !new RegExp(/(\.json$|copy-dir)/).test(v))
  if (resList.length === 0) {
    console.log(`${icons}${space}${emptyErrMsg}`)
  }
  return resList
}
/**
 * @description: 拷贝文件到当前目录
 * @param {string} fileName
 * @return {*}
 */
function fileCopy(fileName) {
  console.log('🚀  fileName', fileName)
  try {
    const file = `${basePath}/${fileName}`
    if (!fs.existsSync(file)) {
      return 0
    }
    console.log('🚀  file', file)
    const tpath = fileName.indexOf('/') >= 0 ? `${process.cwd()}${fileName.substring(fileName.lastIndexOf('/'))}` : `${process.cwd()}/${fileName}`
    copydir(file, tpath, {
      utimes: true,
      cover: false, //是否覆盖
    })
    return 1
  } catch (error) {
    return -1
  }
}
module.exports = {
  readResRecord,
  readReslist,
  fileCopy,
  linkCmdExe,
}
