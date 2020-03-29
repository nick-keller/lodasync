const { mapAsync } = require('./mapAsync')
const { unCurry } = require('./internals/unCurry')

const maxByFn = ([collection, values]) => {
  let maxIndex = 0
  const length = collection.length

  for (let index = 1; index < length; ++index) {
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
