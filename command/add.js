const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')
const inquirer = require('inquirer')

module.exports = () => {
  const promps = []
  promps.push({
    type: 'input',
    name: 'tplName',
    message: '请输入模板名称: ',
    validate: function (input) {
      if(!input) {
        return '不能为空'
      }

      return true
    }
  })

  promps.push({
    type: 'input',
    name: 'gitUrl',
    message: '请输入 git link: ',
    validate: function (input) {
      if(!input) {
        return '不能为空'
      }
      
      return true
    }
  })

  promps.push({
    type: 'input',
    name: 'branch',
    message: '请输入 Branch: ',
    validate: function (input) {
      if(!input) {
        return '不能为空'
      }
      
      return true
    }
  })

  inquirer.prompt(promps).then(function (answer) {
    const { tplName, gitUrl, branch } = answer
    if (!config.tpl[tplName]) {
      config.tpl[tplName] = {}
      config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '')
      config.tpl[tplName]['branch'] = branch
    } else {
      console.log(chalk.red('Template has already existed!'))
      process.exit()
    }

    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(chalk.green('新模板添加成功!\n'))
        console.log(chalk.white('模板列表: \n'))
        console.log(config)
        console.log('\n')
        process.exit()
      }
    })
  })
}