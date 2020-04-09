const mapAsync = require('./mapAsync').default
const { unCurry } = require('./internals/unCurry')
const {
  resolveCollectionAndValues,
} = require('./internals/resolveCollectionAndValues')

const uniqFn = ([collection, values]) => {
  const { length } = collection
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

/**
 * @callback iteratee
 * @async
 * @param {*} element - The current element in the collection.
 * @param {number} [index] - The index of the current element in the collection.
 * @param {*[]} [collection] - The collection.
 * @return {Promise<*>}
 */

/**
 * @async
 * @function uniqByAsync
 * @param {iteratee} callback
 * @param {*[]|Promise<*[]>} collection
 * @return {Promise<*[]>}
 */
module.exports.default = unCurry(uniqByAsync, 2)
