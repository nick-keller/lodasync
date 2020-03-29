const { p } = require('./internals/testUtils')
const { getAsync } = require('./getAsync')

test('getAsync', async() => {
  const obj = p({
    foo: p({
      bar: p('baz'),
    }),
  })

  await expect(getAsync(p('foo.bar'))(obj)).resolves.toBe('baz')
  await expect(getAsync(p('unknown'))(obj)).resolves.toBe(undefined)
})
