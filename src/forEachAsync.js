const { unCurry } = require('./internals/unCurry')
const { mapAsync } = require('./mapAsync')

const returnUndef = () => undefined

const forEachAsync = callback => collection => mapAsync(callback, collection)
  .then(returnUndef)

module.exports.forEachAsync = unCurry(forEachAsync, 2)
