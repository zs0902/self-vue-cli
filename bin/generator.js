// bin/Generator.js
const ora = require('ora')
const { getRepoList } = require('./http')
const inquirer = require('inquirer')

const downloadGitRepo = require('download-git-repo')
const util = require('util')
const path = require('path')

class Generator {
  constructor(name, targetDir) {
    this.timer = null
    // 文件夹名称
    this.name = name

    // 位置
    this.targetDir = targetDir

    // 
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }
  async create() {
    // 1）异步获取模板列表
    const repo = await this.getRepo()
    // console.log(repo);
    // 2）异步获取选择的模板
    await this.download(repo)

    ora('模板下载成功!').succeed()
    clearTimeout(this.timer)

  }
  /*
  获取用户选择的模版
    1.远程拉取模版数据
    2.用户选择所要下载的模版名称
    3.return用户选择的名称
  */

  async getRepo() {
    const repoList = await wrapLoading(getRepoList, '获取模版列表中...')
  	// 空则终止执行
    if (!repoList) return

    // 筛选指定项目，只要目标模版系列
    const repos = repoList.filter(item => item.name.indexOf('qucikFrame') !== -1)

    // 2）用户选择需要下载的模板名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos.map(item => item.description),
      message: '请选择一个模版进行创建'
    })

    // 3. return用户选择
    const selectRepos = repos.filter(item => item.description === repo)[0]
    return { name: selectRepos.name, branch: selectRepos.default_branch }
  }

  // 远程下载模版
  async download({ name, branch }) {
      // 拼接链接
      const requestUrl = `direct:https://github.com/zs0902/${name}/archive/refs/heads/${branch}.zip`
      const spinner = ora()

      // 2min 之后弹出，显示超时
      this.timer = setTimeout(() => {
          clearTimeout(this.timer)
          spinner.fail('模版下载超时，请重试！')
      }, 1000 * 60 * 2);
      // 调用下载方法，进行远程下载
      await wrapLoading(
          this.downloadGitRepo,
          '正在下载目标模版中...',
          requestUrl,
          path.resolve(__dirname, this.targetDir)
      )
  }
}

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // ora初始化，传入提示 message
  const spinner = ora(message)
  // 开始
  spinner.start()
  try {
    // 执行fn
    const result = await fn(...args)
    // 成功
    spinner.succeed('模板列表获取成功!')
    return result
  } catch {
    // 失败
    spinner.fail('请求失败，请重试...')
    return null
  }
}

module.exports = Generator
