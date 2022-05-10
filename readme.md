此自定义脚手架用到了如下命令
commander: 命令行工具
inquirer: 交互式命令行工具
ora: 用于loading效果展示
download-git-repo: 用来下载远程模板
axios: 用来发送请求


Inquirer.js试图为NodeJs做一个可嵌入式的美观的命令行界面。它的功能主要是：

询问操作者问题
获取并解析用户输入
检测用户回答是否合法
管理多层级的提示
提供错误回调
示例：
let inquirer = require('inquirer')
inquirer.prompt([
  {
    type: 'confirm',
    name: 'handsome',
    message: '我是世界上最帅的男人吗?',
    default: true
  }
]).then((answers) => {
  console.log(answers)
})

download-git-repo
这个看名字大概就能猜出它是干嘛的了，没错—它就是帮我们完成下载远程仓库的，它的用法也比较简单，示例如下：

const download = require('download-git-repo')
download(repository, destination, options, callback)

其中 repository 是远程仓库地址；destination是存放项目的文件夹，下载完之后会默认建立在本目录下；options 是一些选项，比如 { clone：boolean } 表示用 http download 还是 git clone 的形式下载，callback就是下载完成之后的回调函数了。


commander
用于帮助快速开发Node.js命令行工具的库, 使用文档
chalk
chalk是一个颜色的插件。可以通过chalk.green(‘success’)来改变颜色，使用文档
download-git-repo
用来通过git下载项目模板的插件，使用文档
ora
用于实现node命令环境的loading效果，并显示各种状态的图标, 使用文档
inquier
用于命令行交互问询等， 使用文档
metalsmith
一个静态网站生成器，可以用在批量处理模板的场景。使用文档
handlebars
模板引擎工具，可用于修改package.json中相关字段，使用文档
log-symbols
用于在打印输出的内容中加入icon更友好，使用文档
rimraf
在node环境下使用unix 命令rm -rf来删除文件