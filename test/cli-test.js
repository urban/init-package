import test from 'tape'

import { tmpDir } from 'os'
import { spawn } from 'child_process'
import { join } from 'path'
import questions from '../src/questions'
import intercept from './helpers/intercept-stream'
import flatten from 'flat'
import help from '../src/help'
import { version } from '../package'

const userInput = {
  pkg: {
    name: 'my-package',
    version: '0.1.0',
    description: 'Test package.'
  },
  user: {
    name: 'John Doe',
    email: 'john.doe@email.com',
    website: 'http://johndoe.com',
    github: 'johndoe'
  }
}

test('It outputs CLI info.', async t => {
  try {
    let child = spawn('init-package', ['--help'])
    let { read } = intercept(child)
    const output = await read()
    t.equal(output, help.trim(), 'Help info.')

    child = spawn('init-package', ['--version'])
    read = intercept(child).read
    t.equal(await read(), version, 'Version info.')
  } catch (err) {
    console.log(err)
  }
  t.end()
})

test('It askes all the questions.', async t => {
  try {
    const prompts = Object.keys(questions)
      .reduce((result, key) => {
        const { description } = questions[key]
        const defaultValue = questions[key]['default']
        result[key] = defaultValue
          ? `>: ${description}: (${defaultValue})`
          : `>: ${description}:`
        return result
      }, {})
    const userProps = flatten(userInput)
    const destDir = join(tmpDir(), 'init-package')

    const child = spawn('init-package', [destDir])
    const { read, write } = intercept(child)
    for (let key in userProps) {
      t.equal(await read(), prompts[key], `Asked for ${key}.`)
      write(userProps[key])
    }
    const results = await read()
    t.deepEqual(results.trim(), JSON.stringify(userInput, undefined, 2), 'Has correct answers')

    child.kill()
  } catch (err) {
    console.log(err)
  }
  t.end()
})
