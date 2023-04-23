const { version } = require('../package.json')
//头部间隔
const space = new Array(4).join(' ')
const spaceSmall = new Array(2).join(' ')
const icons = '🍭'
/**
 * @description: 生成帮助文本
 * @return {string} 帮助文本
 */
const helpText = (function () {
  const helpText = []
  helpText.push(`${icons}${space}-h 帮助`)
  helpText.push(`${icons}${space}-v 版本号`)
  helpText.push(`${icons}${space}list --[resName]  查看资源包列表`)
  helpText.push(`${icons}${space}link --[resName]  链接新的资源包`)
  helpText.push(`${icons}${space}build --[resName] 创新资源链接到当前目录`)
  helpText.push(`${icons}${space}copy --[resName]  拷贝资源包到当前目录`)
  return helpText
})()
//资源描述
const resDesc = { author: '作者', description: '描述' }
/**  错误信息 */
const errMsg = `${icons}${spaceSmall}执行出错!输入 lecmd -h 帮助`
const resErrMsg = `${icons}${spaceSmall}资源不存在!输入 lzcmd -h 帮助`
const curVer = `${icons}${spaceSmall}当前版本 v${version} `
const copySucMsg = `${icons}${spaceSmall}正在拷贝...`
const copyFailMsg = `${icons}${spaceSmall}拷贝失败`
const linkMsg = `${icons}${spaceSmall}link 正在链接...`
const buildMsg = `${icons}${spaceSmall}build 资源创建中...`
const linkErrMsg = `${icons}${spaceSmall}link 链接失败`
const avgErrMsg = `${icons}${spaceSmall}参数不正确 输入 lecmd -h 帮助`
const noConfErrMsg = '未找到res配置'
const emptyErrMsg = '当前资源为空'
const helpShow = helpText.join('\r\n')
module.exports = {
  errMsg,
  resErrMsg,
  curVer,
  helpShow,
  spaceSmall,
  space,
  noConfErrMsg,
  resDesc,
  icons,
  emptyErrMsg,
  linkMsg,
  linkErrMsg,
  avgErrMsg,
  copySucMsg,
  copyFailMsg,
  buildMsg,
}
