const mapAsync = require('./mapAsync').default
const { unCurry } = require('./internals/unCurry')
const {
  resolveCollectionAndValues,
} = require('./internals/resolveCollectionAndValues')

const groupFn = ([collection, keys]) => collection.reduce((acc, cur, i) => {
  const key = keys[i]

  if (Object.prototype.hasOwnProperty.call(acc, key)) {
    acc[key].push(cur)
  } else {
    acc[key] = [cur]
  }

  return acc
}, {})

const groupByAsync = callback => collection => Promise
  .all([
    resolveCollectionAndValues(collection),
    mapAsync(callback, collection),
  ])
  .then(groupFn)

/**
 * @callback iteratee
 * @async
 * @param {*} element - The current element in the collection.
 * @param {number} [index] - The index of the current element in the collection.
 * @param {*[]} [collection] - The collection.
 * @return {Promise<string>}
 */

/**
 * @async
 * @function groupByAsync
 * @param {iteratee} callback
 * @param {*[]|Promise<*[]>} collection
 * @return {Promise<Object>}
 */
module.exports.default = unCurry(groupByAsync, 2)
