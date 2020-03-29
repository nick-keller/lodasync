const { mapAsync } = require('./mapAsync')
const { unCurry } = require('./internals/unCurry')

const findIndexFn = filterResult => filterResult.findIndex(Boolean)

const findIndexAsync = callback => collection => mapAsync(callback, collection)
  .then(findIndexFn)

module.exports.findIndexAsync = unCurry(findIndexAsync, 2)
