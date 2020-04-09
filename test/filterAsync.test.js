const { p } = require('./testUtils')
const filterAsync = require('../filterAsync').default

test('filterAsync', async() => {
  const callback = jest.fn(x => p(x % 3))

  await expect(
    filterAsync(
      callback,
      p([p(7), p(6), p(9), p(13)]),
    ),
  ).resolves.toEqual([7, 13])

  expect(callback.mock.calls).toEqual([
    [7, 0, [p(), p(), p(), p()]],
    [6, 1, [p(), p(), p(), p()]],
    [9, 2, [p(), p(), p(), p()]],
    [13, 3, [p(), p(), p(), p()]],
  ])
})

test('filterAsync empty array', async() => {
  const callback = jest.fn()

  await expect(
    filterAsync(
      callback,
      p([]),
    ),
  ).resolves.toEqual([])

  expect(callback.mock.calls).toEqual([])
})
