const { unCurry } = require('./internals/unCurry')
const mapAsync = require('./mapAsync').default

const returnUndef = () => undefined

const forEachAsync = callback => collection => mapAsync(callback, collection)
  .then(returnUndef)

/**
 * @callback iteratee
 * @async
 * @param {*} element - The current element in the collection.
 * @param {number} [index] - The index of the current element in the collection.
 * @param {*[]} [collection] - The collection.
 * @return {Promise<undefined>}
 */

/**
 * @async
 * @function forEachAsync
 * @param {iteratee} callback
 * @param {*[]|Promise<*[]>} collection
 * @return {Promise<undefined>}
 */
module.exports.default = unCurry(forEachAsync, 2)
