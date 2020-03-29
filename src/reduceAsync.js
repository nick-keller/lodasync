const { resolveArgs } = require('./internals/resolveArgs')
const { unCurry } = require('./internals/unCurry')

const reduceAsync = callback => initialValue => collection => Promise
  .resolve(collection)
  .then(resolvedCollection => resolvedCollection.reduce(
    resolveArgs(callback),
    initialValue,
  ))

module.exports.reduceAsync = unCurry(reduceAsync, 3)
