const { resolveArgs } = require('./internals/resolveArgs')
const { unCurry } = require('./internals/unCurry')

const reduceAsync = callback => initialValue => collection => Promise
  .resolve(collection)
  .then(resolvedCollection => resolvedCollection.reduce(
    resolveArgs(callback),
    initialValue,
  ))

/**
 * @callback iteratee
 * @async
 * @param {*} accumulator
 * @param {*} currentValue
 * @param {number} [index] - The index of the current element in the collection.
 * @param {*[]} [collection] - The collection.
 * @return {Promise<*>}
 */

/**
 * @async
 * @function reduceAsync
 * @param {iteratee} callback
 * @param {*[]|Promise<*[]>} collection
 * @return {Promise<*>}
 */
module.exports.default = unCurry(reduceAsync, 3)
