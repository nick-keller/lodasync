const { p } = require('./testUtils')
const { default: sortByAsync, compareFunction } = require('../sortByAsync')

test('sortByAsync', async() => {
  const callback = jest.fn(x => p(x % 3))

  await expect(
    sortByAsync(
      callback,
      p([p(7), p(6), p(14), p(9)]),
    ),
  ).resolves.toEqual([6, 9, 7, 14])

  expect(callback.mock.calls).toEqual([
    [7, 0, [p(), p(), p(), p()]],
    [6, 1, [p(), p(), p(), p()]],
    [14, 2, [p(), p(), p(), p()]],
    [9, 3, [p(), p(), p(), p()]],
  ])
})

test('sortByAsync empty array', async() => {
  const callback = jest.fn()

  await expect(
    sortByAsync(
      callback,
      p([]),
    ),
  ).resolves.toEqual([])

  expect(callback.mock.calls).toEqual([])
})

test('compareFunction string', () => {
  expect(compareFunction({ criterion: 'a' }, { criterion: 'b' })).toBe(-1)
  expect(compareFunction({ criterion: 'a' }, { criterion: 'a' })).toBe(0)
  expect(compareFunction({ criterion: 'b' }, { criterion: 'a' })).toBe(1)
})

test('compareFunction number', () => {
  expect(compareFunction({ criterion: 0 }, { criterion: 1 })).toBe(-1)
  expect(compareFunction({ criterion: 3 }, { criterion: 3 })).toBe(0)
  expect(compareFunction({ criterion: -2 }, { criterion: -7 })).toBe(1)
})

test('compareFunction Infinity', () => {
  expect(compareFunction({ criterion: Infinity }, { criterion: Infinity }))
    .toBe(0)
  expect(compareFunction({ criterion: Infinity }, { criterion: -Infinity }))
    .toBe(1)
  expect(compareFunction({ criterion: -Infinity }, { criterion: Infinity }))
    .toBe(-1)
  expect(compareFunction({ criterion: -Infinity }, { criterion: -Infinity }))
    .toBe(0)

  expect(compareFunction({ criterion: Infinity }, { criterion: 'u' })).toBe(1)
  expect(compareFunction({ criterion: -Infinity }, { criterion: 'p' })).toBe(-1)
  expect(compareFunction({ criterion: 'x' }, { criterion: Infinity })).toBe(-1)
  expect(compareFunction({ criterion: 'a' }, { criterion: -Infinity })).toBe(1)
})
