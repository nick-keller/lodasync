const { p } = require('./internals/testUtils')
const { everyAsync } = require('./everyAsync')

test('everyAsync true', async() => {
  const callback = jest.fn(x => p(x % 2 === 0))

  await expect(
    everyAsync(
      callback,
      p([p(12), p(6), p(8)])
    ),
  ).resolves.toEqual(true)

  expect(callback.mock.calls).toEqual([
    [12, 0, [p(), p(), p()]],
    [6, 1, [p(), p(), p()]],
    [8, 2, [p(), p(), p()]],
  ])
})

test('everyAsync false', async() => {
  const callback = jest.fn(x => p(x % 2 === 0))

  await expect(
    everyAsync(
      callback,
      p([p(7), p(6)])
    ),
  ).resolves.toEqual(false)

  expect(callback.mock.calls).toEqual([
    [7, 0, [p(), p()]],
    [6, 1, [p(), p()]],
  ])
})
