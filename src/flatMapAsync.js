const { mapAsync } = require('./mapAsync')
const { unCurry } = require('./internals/unCurry')

const flatFn = result => result.flat()

const flatMapAsync = callback => collection => mapAsync(callback, collection)
  .then(flatFn)

module.exports.flatMapAsync = unCurry(flatMapAsync, 2)
