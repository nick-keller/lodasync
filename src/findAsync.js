const { findIndexAsync } = require('./findIndexAsync')
const { unCurry } = require('./internals/unCurry')

const findFn = ([collection, index]) => collection[index]

const findAsync = callback => collection => Promise
  .all([
    collection,
    findIndexAsync(callback, collection),
  ])
  .then(findFn)

module.exports.findAsync = unCurry(findAsync, 2)
