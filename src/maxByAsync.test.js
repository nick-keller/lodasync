const { p } = require('./internals/testUtils')
const { maxByAsync } = require('./maxByAsync')

test('maxByAsync', async() => {
  const callback = jest.fn(x => p(x % 3))

  await expect(
    maxByAsync(
      callback,
      p([p(6), p(7), p(9), p(13)]),
    ),
  ).resolves.toEqual(7)

  expect(callback.mock.calls).toEqual([
    [6, 0, [p(), p(), p(), p()]],
    [7, 1, [p(), p(), p(), p()]],
    [9, 2, [p(), p(), p(), p()]],
    [13, 3, [p(), p(), p(), p()]],
  ])
})

test('maxByAsync empty array', async() => {
  const callback = jest.fn()

  await expect(
    maxByAsync(
      callback,
      p([]),
    ),
  ).resolves.toEqual(undefined)

  expect(callback.mock.calls).toEqual([])
})
