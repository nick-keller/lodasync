const mapAsync = require('./mapAsync').default
const { unCurry } = require('./internals/unCurry')

const everyFn = result => result.every(Boolean)

const everyAsync = callback => collection => mapAsync(callback, collection)
  .then(everyFn)

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
 * @function everyAsync
 * @param {iteratee} callback
 * @param {*[]|Promise<*[]>} collection
 * @return {Promise<boolean>}
 */
module.exports.default = unCurry(everyAsync, 2)
