const { mapAsync } = require('./mapAsync')
const { unCurry } = require('./internals/unCurry')

const maxByFn = ([collection, values]) => {
  let maxIndex = 0

  for (let index = 1; index < collection.length; ++index) {
    if (values[index] > values[maxIndex]) {
      maxIndex = index
    }
  }

  return collection[maxIndex]
}

const maxByAsync = callback => collection => Promise
  .all([
    collection,
    mapAsync(callback, collection),
  ])
  .then(maxByFn)

module.exports.maxByAsync = unCurry(maxByAsync, 2)
