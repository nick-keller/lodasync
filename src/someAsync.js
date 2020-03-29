const { mapAsync } = require('./mapAsync')
const { unCurry } = require('./internals/unCurry')

const someFn = result => result.some(Boolean)

const someAsync = callback => collection => mapAsync(callback, collection)
  .then(someFn)

module.exports.someAsync = unCurry(someAsync, 2)
