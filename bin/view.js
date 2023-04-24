/*
 * @Author: maskMan
 * @LastEditTime: 2023-04-24 08:01:58
 * @Descripttion:获取资源配置描述
 */
const { readResRecord, readReslist, fileCopy, linkCmdExe, delCmdExe } = require('./file')
/**
 * @description: 查看指定路径下资源包列表
 * @param {string} dir 路径名
 * @param {string} resName 资源包名
 * @return {*}
 */
function viewResList() {
  const resList = readReslist()
  for (let index = 0; index < resList.length; index++) {
    const resName = resList[index]
    console.log(readResRecord(resName))
  }
}
/**
 * @description: 查看指定路径下单个资源包
 * @param {string} dir 路径名
 * @param {string} resName 资源包名
 * @return {*}
 */
function viewResSingle(resName) {
  const currName = resName.replace('-', '')
  //返回指定单个资源包信息
  return readResRecord(currName)
}

/**
 * @description: 拷贝资源
 * @param {string} dir 路径名
 * @param {string} resName 资源包名
 * @return {*}
 */
function copyFile(resName) {
  return fileCopy(resName)
}
function linkToCmd(resName) {
  return linkCmdExe(resName)
}
function delToCmd(resName) {
  return delCmdExe(resName)
}
module.exports = {
  viewResSingle,
  viewResList,
  copyFile,
  linkToCmd,
  delToCmd,
}
