const { mapAsync } = require('./mapAsync')
const { unCurry } = require('./internals/unCurry')

const everyFn = result => result.every(Boolean)

const everyAsync = callback => collection => mapAsync(callback, collection)
  .then(everyFn)

module.exports.everyAsync = unCurry(everyAsync, 2)
