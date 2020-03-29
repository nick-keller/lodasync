const { mapAsync } = require('./mapAsync')
const { unCurry } = require('./internals/unCurry')
const {
  resolveCollectionAndValues,
} = require('./internals/resolveCollectionAndValues')

const groupFn = ([collection, keys]) => collection.reduce((acc, cur, i) => {
  const key = keys[i]

  if (Object.prototype.hasOwnProperty.call(acc, key)) {
    acc[key].push(cur)
  } else {
    acc[key] = [cur]
  }

  return acc
}, {})

const groupByAsync = callback => collection => Promise
  .all([
    resolveCollectionAndValues(collection),
    mapAsync(callback, collection),
  ])
  .then(groupFn)

module.exports.groupByAsync = unCurry(groupByAsync, 2)
