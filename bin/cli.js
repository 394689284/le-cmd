#!/usr/bin/env node
/*
 * @Author: maskMan
 * @LastEditTime: 2023-04-23 20:48:15
 * @Descripttion: lz命令入口
 */
const cmdList = ['-v', '-h', 'list', 'link', 'copy', 'build']
const { errMsg, resErrMsg, linkMsg, linkErrMsg, copySucMsg, copyFailMsg, avgErrMsg, curVer, helpShow, buildMsg } = require('./toast')
const { viewResSingle, viewResList, copyFile, linkToCmd } = require('./view')
/**
 * @description: 显示资源列表
 * @param {string} cmd 命令
 * @param {string} isSignle 是否无参数
 * @param {string} resName 资源名参数
 * @return {boolean}
 */
function showResCmd(cmd, isSignle, resName) {
  if (cmd == 'list' && resName) {
    //查看指定单个资源
    console.log(viewResSingle(resName))
    return true
  } else if (cmd == 'list' && isSignle) {
    //查看路径下所有资源
    viewResList()
    return true
  } else if (cmd == 'list') {
    //资源不存在
    console.log(resErrMsg)
    return true
  }
  return false
}
/**
 * @description:显示帮助列表
 * @return {boolean}
 */
function showHelpCmd(cmd) {
  if (cmd == '-h') {
    console.log(helpShow)
    return true
  }
  if (cmd == '-v') {
    console.log(curVer)
    return true
  }
  return false
}
/**
 * @description:显示链接link命令
 * @param {string} cmd 命令
 * @param {string} resName 资源名
 * @return {boolean} 是否中
 */
function showLinkCmd(cmd, resName) {
  console.log('🚀  resName', resName)
  if (cmd == 'link' && resName) {
    try {
      linkToCmd(resName)
      console.log(linkMsg)
    } catch (error) {
      console.log(linkErrMsg, error)
    }
    return true
  } else if (cmd == 'link' && !resName) {
    console.log(avgErrMsg)
    return true
  }
  return false
}
/**
 * @description:显示复制命令
 * @param {string} cmd 命令
 * @param {string} resName 资源名
 * @return {boolean} 是否中
 */
function showCopyCmd(cmd, resName) {
  if (cmd == 'copy' && resName) {
    const result = copyFile(resName)
    if (result == 1) {
      console.log(copySucMsg)
      return true
    } else if (result == -1) {
      console.log(copyFailMsg)
      return true
    } else if (result == 0) {
      console.log(resErrMsg)
      return true
    }
    return false
  } else if (cmd == 'copy' && !resName) {
    console.log(avgErrMsg)
    return true
  }
  return false
}
/**
 * @description:检查解析命令
 * @return {object} 命令
 */
function checkCmd() {
  const cmd = process.argv.find((v) => v === cmdList.find((n) => n === v))
  const resName = process.argv.find((v) => v.indexOf('--') >= 0)
  return {
    cmd: cmd,
    isSignle: process.argv.length === 3,
    resName: resName ? resName.replace('--', '') : null,
  }
}

;(async function main() {
  const { cmd, isSignle, resName } = checkCmd()
  if (cmd) {
    if (showHelpCmd(cmd)) {
      return
    }
    if (cmd === 'build') {
      linkToCmd(false)
      console.log(buildMsg)
      return
    }
    if (showLinkCmd(cmd, resName)) {
      return
    }
    if (showCopyCmd(cmd, resName)) {
      return
    }
    if (showResCmd(cmd, isSignle, resName)) {
      return
    }
    console.log(errMsg)
    return
  }
  console.log(helpShow)
})()
