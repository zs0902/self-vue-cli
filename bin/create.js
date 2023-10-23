// bin.create.js
const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Generator = require('./Generator')
const ora = require('ora')
const chalk = require('chalk')

module.exports = async function (name, options) {
  // 获取当前目录
  const cwd = process.cwd()
  // 获取目标文件夹地址
  const targetDir = path.join(cwd, name)

  // 是否已存在文件夹
  if (fs.existsSync(targetDir)) {
    // 是否强制创建(覆盖)
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      // 异步获取结果
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: '目录已存在，请选择一项进行操作：',
          choices: [
            {
              name: '覆盖',
              value: 'overwrite'
            }, {
              name: '取消',
              value: false
            }
          ],
        }
      ])
      // 根据结果做出相应处理
      if (!action) {
        return
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(chalk.blue(`\r\nRemoving...`))
        await fs.remove(targetDir)
      }
    }
  }

  ora('文件夹创建成功!').succeed()
  // 最后询问完成之后进行调用
  const generator = new Generator(name, targetDir)
  generator.create()
}
