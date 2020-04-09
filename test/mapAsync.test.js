const { p } = require('./testUtils')
const mapAsync = require('../mapAsync').default

test('mapAsync', async() => {
  const callback = jest.fn(x => p(x * 2))

  await expect(
    mapAsync(
      callback,
      p([p(7), p(5), p(13)]),
    ),
  ).resolves.toEqual([14, 10, 26])

  expect(callback.mock.calls).toEqual([
    [7, 0, [p(), p(), p()]],
    [5, 1, [p(), p(), p()]],
    [13, 2, [p(), p(), p()]],
  ])
})

test('mapAsync empty array', async() => {
  const callback = jest.fn()

  await expect(
    mapAsync(
      callback,
      p([]),
    ),
  ).resolves.toEqual([])

  expect(callback.mock.calls).toEqual([])
})
