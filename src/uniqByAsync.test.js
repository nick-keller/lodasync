const { p } = require('./internals/testUtils')
const { uniqByAsync } = require('./uniqByAsync')

test('uniqByAsync', async() => {
  const callback = jest.fn(x => p(x % 2))

  await expect(
    uniqByAsync(
      callback,
      p([p(7), p(3), p(4), p(13), p(6)]),
    ),
  ).resolves.toEqual([7, 4])

  expect(callback.mock.calls).toEqual([
    [7, 0, [p(), p(), p(), p(), p()]],
    [3, 1, [p(), p(), p(), p(), p()]],
    [4, 2, [p(), p(), p(), p(), p()]],
    [13, 3, [p(), p(), p(), p(), p()]],
    [6, 4, [p(), p(), p(), p(), p()]],
  ])
})

test('uniqByAsync empty array', async() => {
  const callback = jest.fn()

  await expect(
    uniqByAsync(
      callback,
      p([]),
    ),
  ).resolves.toEqual([])

  expect(callback.mock.calls).toEqual([])
})
