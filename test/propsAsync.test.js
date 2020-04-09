const { p } = require('./testUtils')
const propsAsync = require('../propsAsync').default

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
