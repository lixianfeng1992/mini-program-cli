const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')
const inquirer = require('inquirer')

module.exports = () => {
  const promps = [{
    type: 'input',
    name: 'tplName',
    message: '请输入模板名称: ',
    validate: function (input) {
      if(!input) {
        return '不能为空'
      }

      return true
    }
  }]

  inquirer.prompt(promps).then((answer) => {
    const { tplName } = answer
    if (config.tpl[tplName]) {
      config.tpl[tplName] = undefined
    } else {
      console.log(chalk.white('模板不存在!'))
      process.exit()
    }

    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(chalk.green('模板已删除!'))
        console.log(chalk.white('模板列表: \n'))
        console.log(config)
        console.log('\n')
        process.exit()
      }
    })
  })
}