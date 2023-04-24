## 模板资源快捷链接/引入/复制命令工具

#### 功能介绍

`快捷引入/链接/复制模板资源到当前项目路径下`

---

#### 说明

```
  模板资源---指自己定义/封装需要重复使用的的组件/模板/模块库等避免重复造轮子
  模板名字--- package.json 配置中的名字
  模板库---专门存放模板资源的文件夹
  项目目录---当前开发中的项目目录
  模板库代码更新 则项目下模板资源会级联更新

```

### 命令

```
  - lz -v 查看版本
  - lz -h 帮助
  - lz list 查看当前项目路径下所有的模板库资源
  - lz link --模板名字 将当前模板资源提交到模板库
  - lz build 无参数 加载模板库所有资源到当前项目的node_modules路径下
  - lz copy --模板名字/子文件夹 拷贝模板资源或子文件到当前运行命令的路径下 /子文件夹 不写则拷贝整个文件夹
  - lz del --模板名字  删除当前项目的指定模板资源 无参数则删除项目下所有模板资源
```

---

#### 用法

1. 全局安装 npm i le-cmd -g 运行 npm link
2. 创建好自己的模板资源
3. 模板资源目录下运行 npm link 在运行 lz link --模板名字 上传到模板库
4. 项目目录下 运行 lz build 拉取资源库到 node_modules 路径下
5. 任意目录下 运行 lz copy --模板名字 拷贝模板到当前目录
6. 运行 lz del --模板名字 删除项目下的模板库 实际模板资源不会删除

安装 Search node_modules 插件 可快速搜索模板资源

##### Git [仓库地址](https://github.com/394689284/le-cmd)
