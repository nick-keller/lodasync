const { mapAsync } = require('./mapAsync')
const { unCurry } = require('./internals/unCurry')
const { resolveCollectionAndValues } = require('./internals/resolveCollectionAndValues')

const uniqFn = ([collection, values]) => {
  const length = collection.length
  const result = []
  const seen = new Set()

  for (let index = 0; index < length; ++index) {
    const value = values[index]

    if (seen.has(value)) {
      continue
    }

    seen.add(value)
    result.push(collection[index])
  }

  return result
}

const uniqByAsync = callback => collection => Promise
  .all([
    resolveCollectionAndValues(collection),
    mapAsync(callback, collection),
  ])
  .then(uniqFn)

module.exports.uniqByAsync = unCurry(uniqByAsync, 2)
