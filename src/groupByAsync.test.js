const { p } = require('./internals/testUtils')
const { groupByAsync } = require('./groupByAsync')

test('groupByAsync', async() => {
  const callback = jest.fn(x => p(x % 2))

  await expect(
    groupByAsync(
      callback,
      p([p(7), p(3), p(4), p(13), p(6)]),
    ),
  ).resolves.toEqual({
    0: [4, 6],
    1: [7, 3, 13],
  })

  expect(callback.mock.calls).toEqual([
    [7, 0, [p(), p(), p(), p(), p()]],
    [3, 1, [p(), p(), p(), p(), p()]],
    [4, 2, [p(), p(), p(), p(), p()]],
    [13, 3, [p(), p(), p(), p(), p()]],
    [6, 4, [p(), p(), p(), p(), p()]],
  ])
})
