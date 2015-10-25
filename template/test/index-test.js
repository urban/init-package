import test from 'tape'

import greet from '../src'

test('It should output greetings.', t => {
  t.equal(greet(), 'Hello world!', 'Outputs default greeting.')
  t.equal(greet('foo'), 'Hello foo!', 'Outputs custom greeting.')
  t.end()
})
