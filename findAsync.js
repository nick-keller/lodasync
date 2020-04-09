const findIndexAsync = require('./findIndexAsync').default
const { unCurry } = require('./internals/unCurry')

const findFn = ([collection, index]) => collection[index]

const findAsync = callback => collection => Promise
  .all([
    collection,
    findIndexAsync(callback, collection),
  ])
  .then(findFn)

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
 * @function findAsync
 * @param {iteratee} callback
 * @param {*[]|Promise<*[]>} collection
 * @return {Promise<*>}
 */
module.exports.default = unCurry(findAsync, 2)
