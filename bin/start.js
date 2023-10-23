#! /usr/bin/env node
// 这一行是必须加的，这是告诉系统当前脚本由node.js来解析执行

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// commander 命令行开发工具库
const Program = require('commander')
const version = require('../package.json').version;
const chalk = require('chalk')

// 版本
Program.version(version, '-v, --version') 

// 新建命令 create
Program
    .command('create <name>')
    .description('创建项目') // 描述
    .option('-f, --force', '是否强制覆盖') // 参数 -f or --force 为强制创建，如果创建的目录存在则直接覆盖
    .action((name, options) => { // 回调
        // 打印命令行输入的值
        console.log('name:', chalk.yellow(name), 'options:', chalk.yellow(JSON.stringify(options)));
        require('./create.js')(name, options)
    })

// 查看模板列表 
// Program
//     .command('list')
//     .description('模板列表')
//     .action(()=>{
//         // require('../src/list')
//     })

// 必须 解析用户执行命令传入参数
Program.parse(process.argv)

if (!Program.args.length) {
    Program.help();
}