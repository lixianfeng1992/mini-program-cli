const exec = require('child_process').exec
const config = require('../templates')
const chalk = require('chalk')
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
    name: 'projectName',
    message: '请输入项目名称: ',
    validate: function (input) {
      if(!input) {
        return '不能为空'
      }

      return true
    }
  })

  inquirer.prompt(promps).then((answer) => {
    const { tplName, projectName } = answer
    if (!config.tpl[tplName]) {
      console.log(chalk.red('\n × 模板不存在!'))
      process.exit()
    }

    const gitUrl = config.tpl[tplName].url
    const branch = config.tpl[tplName].branch
    console.log(projectName)
    let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`
    console.log(chalk.white('\n Start generating...'))
    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }

      console.log(chalk.green('\n √ Generation completed!'))
      console.log(`\n cd ${projectName} && npm install \n`)
      process.exit()
    })
  })
}