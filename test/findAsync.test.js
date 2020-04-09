const { p } = require('./testUtils')
const findAsync = require('../findAsync').default

test('findAsync', async() => {
  const callback = jest.fn(x => p(x % 3 === 0))

  await expect(
    findAsync(
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

test('findAsync no results', async() => {
  const callback = jest.fn(x => p(x % 3 === 0))

  await expect(
    findAsync(
      callback,
      p([p(7), p(13)]),
    ),
  ).resolves.toEqual(undefined)

  expect(callback.mock.calls).toEqual([
    [7, 0, [p(), p()]],
    [13, 1, [p(), p()]],
  ])
})

test('findAsync empty array', async() => {
  const callback = jest.fn()

  await expect(
    findAsync(
      callback,
      p([]),
    ),
  ).resolves.toEqual(undefined)

  expect(callback.mock.calls).toEqual([])
})
