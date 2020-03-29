const { p } = require('./internals/testUtils')
const { minByAsync } = require('./minByAsync')

test('minByAsync', async() => {
  const callback = jest.fn(x => p(x % 3))

  await expect(
    minByAsync(
      callback,
      p([p(7), p(6), p(9), p(13)]),
    ),
  ).resolves.toEqual(6)

  expect(callback.mock.calls).toEqual([
    [7, 0, [p(), p(), p(), p()]],
    [6, 1, [p(), p(), p(), p()]],
    [9, 2, [p(), p(), p(), p()]],
    [13, 3, [p(), p(), p(), p()]],
  ])
})

test('minByAsync empty array', async() => {
  const callback = jest.fn()

  await expect(
    minByAsync(
      callback,
      p([]),
    ),
  ).resolves.toEqual(undefined)

  expect(callback.mock.calls).toEqual([])
})
