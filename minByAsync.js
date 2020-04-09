const mapAsync = require('./mapAsync').default
const { unCurry } = require('./internals/unCurry')

const minByFn = ([collection, values]) => {
  let minIndex = 0

  for (let index = 1; index < collection.length; ++index) {
    if (values[index] < values[minIndex]) {
      minIndex = index
    }
  }

  return collection[minIndex]
}

const minByAsync = callback => collection => Promise
  .all([
    collection,
    mapAsync(callback, collection),
  ])
  .then(minByFn)

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
 * @function minByAsync
 * @param {iteratee} callback
 * @param {*[]|Promise<*[]>} collection
 * @return {Promise<*>}
 */
module.exports.default = unCurry(minByAsync, 2)
