const mapAsync = require('./mapAsync').default
const { unCurry } = require('./internals/unCurry')

const flatFn = result => result.flat()

const flatMapAsync = callback => collection => mapAsync(callback, collection)
  .then(flatFn)

/**
 * @callback iteratee
 * @async
 * @param {*} element - The current element in the collection.
 * @param {number} [index] - The index of the current element in the collection.
 * @param {*[]} [collection] - The collection.
 * @return {Promise<*|*[]>}
 */

/**
 * @async
 * @function flatMapAsync
 * @param {iteratee} callback
 * @param {*[]|Promise<*[]>} collection
 * @return {Promise<*[]>}
 */
module.exports.default = unCurry(flatMapAsync, 2)
