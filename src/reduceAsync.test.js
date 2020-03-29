const { p } = require('./internals/testUtils')
const { reduceAsync } = require('./reduceAsync')

test('reduceAsync', async() => {
  const callback = jest.fn((acc, cur) => p(acc + cur))

  await expect(
    reduceAsync(
      callback,
      p(9),
      p([p(7), p(5), p(13)]),
    ),
  ).resolves.toEqual(34)

  expect(callback.mock.calls).toEqual([
    [9, 7, 0, [p(), p(), p()]],
    [16, 5, 1, [p(), p(), p()]],
    [21, 13, 2, [p(), p(), p()]],
  ])
})
