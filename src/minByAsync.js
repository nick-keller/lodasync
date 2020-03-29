const { mapAsync } = require('./mapAsync')
const { unCurry } = require('./internals/unCurry')

const minByFn = ([collection, values]) => {
  let minIndex = 0
  const length = collection.length

  for (let index = 1; index < length; ++index) {
    if (values[index] < values[minIndex]) {
      minIndex = index
    }
  }

  return collection[minIndex]
}

const minByAsync = callback => collection => Promise
  .all([
    collection,
    mapAsync(callback, collection),
  ])
  .then(minByFn)

module.exports.minByAsync = unCurry(minByAsync, 2)
