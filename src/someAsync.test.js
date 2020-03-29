const { p } = require('./internals/testUtils')
const { someAsync } = require('./someAsync')

test('someAsync true', async() => {
  const callback = jest.fn(x => p(x % 2 === 0))

  await expect(
    someAsync(
      callback,
      p([p(7), p(6), p(13)]),
    ),
  ).resolves.toEqual(true)

  expect(callback.mock.calls).toEqual([
    [7, 0, [p(), p(), p()]],
    [6, 1, [p(), p(), p()]],
    [13, 2, [p(), p(), p()]],
  ])
})

test('someAsync false', async() => {
  const callback = jest.fn(x => p(x % 2 === 0))

  await expect(
    someAsync(
      callback,
      p([p(7), p(13)]),
    ),
  ).resolves.toEqual(false)

  expect(callback.mock.calls).toEqual([
    [7, 0, [p(), p()]],
    [13, 1, [p(), p()]],
  ])
})
