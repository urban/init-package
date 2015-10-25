#! /usr/bin/env node

/* @flow */
import minimist from 'minimist'
import { version } from '../package'
import flatten from 'flat'
import { basename, join, resolve } from 'path'
import help from './help'
import userQuestions from './questions'
import scaffold from '@urban/scaffold'

function cli (argv: Array = [], questions: Object = userQuestions): void {
  const args = minimist(argv, {
    boolean: ['help', 'version'],
    alias: {
      h: 'help',
      V: 'version'
    }
  })

  if (args.help) {
    return console.log(help)
  }

  if (args.version) {
    return console.log(version)
  }

  const {pkg, user} = args
  const srcDir = join(__dirname, '../template')
  const destDir = args._.length ? resolve(args._[0]) : process.cwd()
  const props = {}
  if (pkg) props.pkg = pkg
  if (user) props.user = user
  questions['pkg.name']['default'] = basename(destDir)
  scaffold(srcDir, destDir, questions, flatten(props))
}

if (!module.parent) {
  cli(process.argv.slice(2))
}

export default cli
