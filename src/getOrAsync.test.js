const { p } = require('./internals/testUtils')
const { getOrAsync } = require('./getOrAsync')

test('getOrAsync', async() => {
  const obj = p({
    foo: p({
      bar: p('baz'),
    }),
    bor: p([
      p(42),
      p({
        biz: p(null),
      }),
    ]),
  })

  await expect(getOrAsync(p(undefined), p('foo.bar'), obj))
    .resolves.toBe('baz')
  await expect(getOrAsync(p(undefined), p(['foo', 'bar']), obj))
    .resolves.toBe('baz')
  await expect(getOrAsync(p(undefined), p('bor.0'), obj))
    .resolves.toBe(42)
  await expect(getOrAsync(p(undefined), p('bor.1.biz'), obj))
    .resolves.toBe(null)
  await expect(getOrAsync(p(undefined), p('unknown'), obj))
    .resolves.toBe(undefined)
  await expect(getOrAsync(p('default'), p('bor.1.biz.unknown'), obj))
    .resolves.toBe('default')
  await expect(getOrAsync(p(undefined), p('bor.unknown.biz'), obj))
    .resolves.toBe(undefined)
  await expect(getOrAsync(p(undefined), p('bor.length'), obj))
    .resolves.toBe(2)
})
