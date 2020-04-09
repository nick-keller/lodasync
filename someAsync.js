const mapAsync = require('./mapAsync').default
const { unCurry } = require('./internals/unCurry')

const someFn = result => result.some(Boolean)

const someAsync = callback => collection => mapAsync(callback, collection)
  .then(someFn)

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
 * @function someAsync
 * @param {iteratee} callback
 * @param {*[]|Promise<*[]>} collection
 * @return {Promise<boolean>}
 */
module.exports.default = unCurry(someAsync, 2)
