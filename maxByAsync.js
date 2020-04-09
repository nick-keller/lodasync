const mapAsync = require('./mapAsync').default
const { unCurry } = require('./internals/unCurry')

const maxByFn = ([collection, values]) => {
  let maxIndex = 0

  for (let index = 1; index < collection.length; ++index) {
    if (values[index] > values[maxIndex]) {
      maxIndex = index
    }
  }

  return collection[maxIndex]
}

const maxByAsync = callback => collection => Promise
  .all([
    collection,
    mapAsync(callback, collection),
  ])
  .then(maxByFn)

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
 * @function maxByAsync
 * @param {iteratee} callback
 * @param {*[]|Promise<*[]>} collection
 * @return {Promise<*>}
 */
module.exports.default = unCurry(maxByAsync, 2)
