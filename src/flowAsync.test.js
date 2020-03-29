const { p } = require('./internals/testUtils')
const { flowAsync } = require('./flowAsync')

test('flowAsync', async() => {
  const callback1 = jest.fn(() => p('bar'))
  const callback2 = jest.fn(() => p('baz'))
  const callback3 = jest.fn(() => p('biz'))

  await expect(
    flowAsync(
      callback1,
      callback2,
      callback3,
    )(p('foo')),
  ).resolves.toEqual('biz')

  expect(callback1).toHaveBeenCalledWith('foo')
  expect(callback2).toHaveBeenCalledWith('bar')
  expect(callback3).toHaveBeenCalledWith('baz')
})
