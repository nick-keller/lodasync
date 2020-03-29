const { mapAsync } = require('./mapAsync')
const { unCurry } = require('./internals/unCurry')
const {
  resolveCollectionAndValues,
} = require('./internals/resolveCollectionAndValues')

const filterFn = ([collection, filterResult]) => collection
  .filter((_, i) => filterResult[i])

const filterAsync = callback => collection => Promise
  .all([
    resolveCollectionAndValues(collection),
    mapAsync(callback, collection),
  ])
  .then(filterFn)

module.exports.filterAsync = unCurry(filterAsync, 2)
