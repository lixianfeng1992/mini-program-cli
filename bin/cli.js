#!/usr/bin/env Node

process.env.NODE_PATH = __dirname + '/../node_modules/'

const program = require('commander')

program
  .version(require('../package').version)
  .usage('<command>')

program
  .command('add')
  .description('添加新模板')
  .alias('a')
  .action(() => {
    require('../command/add')()
  })

program
  .command('list')
  .description('List all the templates')
  .alias('l')
  .action(() => {
    require('../command/list')()
  })

program
  .command('init')
  .description('Generate a new project')
  .alias('i')
  .action(() => {
    require('../command/init')()
  })

program
  .command('delete')
  .description('Delete a template')
  .alias('d')
  .action(() => {
    require('../command/delete')()
  })

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}