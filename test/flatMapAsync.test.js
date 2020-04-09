const { p } = require('./testUtils')
const flatMapAsync = require('../flatMapAsync').default

test('flatMapAsync', async() => {
  const callback = jest.fn(x => p(x % 2 === 0 ? [x, x / 2] : x))

  await expect(
    flatMapAsync(
      callback,
      p([p(7), p(6), p(13)]),
    ),
  ).resolves.toEqual([7, 6, 3, 13])

  expect(callback.mock.calls).toEqual([
    [7, 0, [p(), p(), p()]],
    [6, 1, [p(), p(), p()]],
    [13, 2, [p(), p(), p()]],
  ])
})

test('flatMapAsync empty array', async() => {
  const callback = jest.fn()

  await expect(
    flatMapAsync(
      callback,
      p([]),
    ),
  ).resolves.toEqual([])

  expect(callback.mock.calls).toEqual([])
})
