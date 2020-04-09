const { p } = require('./testUtils')
const getAsync = require('../getAsync').default

test('getAsync', async() => {
  const obj = p({
    foo: p({
      bar: p('baz'),
    }),
  })

  await expect(getAsync(p('foo.bar'))(obj)).resolves.toBe('baz')
  await expect(getAsync(p('unknown'))(obj)).resolves.toBe(undefined)
})
