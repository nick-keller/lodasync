const { p } = require('./internals/testUtils')
const { propsAsync } = require('./propsAsync')

test('propsAsync', async() => {
  await expect(
    propsAsync(p({
      a: p('a'),
      one: p(1),
      sync: 'sync',
    })),
  ).resolves.toEqual({
    a: 'a',
    one: 1,
    sync: 'sync',
  })
})
