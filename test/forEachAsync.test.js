const { p } = require('./testUtils')
const forEachAsync = require('../forEachAsync').default

test('forEachAsync', async() => {
  const callback = jest.fn(x => p(x))

  await expect(
    forEachAsync(
      callback,
      p([p(7), p(5), p(13)]),
    ),
  ).resolves.toBe(undefined)

  expect(callback.mock.calls).toEqual([
    [7, 0, [p(), p(), p()]],
    [5, 1, [p(), p(), p()]],
    [13, 2, [p(), p(), p()]],
  ])
})

test('forEachAsync empty array', async() => {
  const callback = jest.fn()

  await expect(
    forEachAsync(
      callback,
      p([]),
    ),
  ).resolves.toBe(undefined)

  expect(callback.mock.calls).toEqual([])
})
