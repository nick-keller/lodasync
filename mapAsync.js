const { resolveArgs } = require('./internals/resolveArgs')
const { unCurry } = require('./internals/unCurry')

const mapAsync = callback => collection => Promise
  .resolve(collection)
  .then(resolvedCollection => Promise.all(resolvedCollection.map(
    resolveArgs(callback),
  )))

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
 * @function mapAsync
 * @param {iteratee} callback
 * @param {*[]|Promise<*[]>} collection
 * @return {Promise<*[]>}
 */
module.exports.default = unCurry(mapAsync, 2)
