const mapAsync = require('./mapAsync').default
const { unCurry } = require('./internals/unCurry')
const {
  resolveCollectionAndValues,
} = require('./internals/resolveCollectionAndValues')

const filterFn = ([collection, filterResult]) => collection
  .filter((_, i) => filterResult[i])

const filterAsync = callback => collection => Promise
  .all([
    resolveCollectionAndValues(collection),
    mapAsync(callback, collection),
  ])
  .then(filterFn)

/**
 * @callback iteratee
 * @async
 * @param {*} element - The current element in the collection.
 * @param {number} [index] - The index of the current element in the collection.
 * @param {*[]} [collection] - The collection.
 * @return {Promise<boolean>}
 */

/**
 * @async
 * @function filterAsync
 * @param {iteratee} callback
 * @param {*[]|Promise<*[]>} collection
 * @return {Promise<*[]>}
 */
module.exports.default = unCurry(filterAsync, 2)
