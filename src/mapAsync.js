const { resolveArgs } = require('./internals/resolveArgs')
const { unCurry } = require('./internals/unCurry')

const mapAsync = callback => collection => Promise
  .resolve(collection)
  .then(resolvedCollection => Promise.all(resolvedCollection.map(
    resolveArgs(callback),
  )))

module.exports.mapAsync = unCurry(mapAsync, 2)
