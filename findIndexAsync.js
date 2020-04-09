const mapAsync = require('./mapAsync').default
const { unCurry } = require('./internals/unCurry')

const findIndexFn = filterResult => filterResult.findIndex(Boolean)

const findIndexAsync = callback => collection => mapAsync(callback, collection)
  .then(findIndexFn)

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
 * @function findIndexAsync
 * @param {iteratee} callback
 * @param {*[]|Promise<*[]>} collection
 * @return {Promise<number>}
 */
module.exports.default = unCurry(findIndexAsync, 2)
