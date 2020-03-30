const { unCurry } = require('./internals/unCurry')

const compareFunction = (a, b) => {
  if (a.criterion === Infinity) {
    return b.criterion === Infinity ? 0 : 1
  }

  if (b.criterion === Infinity) {
    return -1
  }

  if (a.criterion === -Infinity) {
    return b.criterion === -Infinity ? 0 : -1
  }

  if (b.criterion === -Infinity) {
    return 1
  }

  if (a.criterion < b.criterion) {
    return -1
  }

  return a.criterion > b.criterion ? 1 : 0
}

module.exports.compareFunction = compareFunction

const getValue = element => element.value

const sortByFn = collection => collection.sort(compareFunction).map(getValue)

const sortByAsync = callback => collection => Promise
  .resolve(collection)
  .then(resolvedCollection => Promise.all(
    resolvedCollection.map((value, index) => Promise
      .resolve(value)
      .then(resolvedValue => Promise
        .resolve(callback(resolvedValue, index, resolvedCollection))
        .then(criterion => ({
          value: resolvedValue,
          criterion,
        })))),
  ))
  .then(sortByFn)

module.exports.sortByAsync = unCurry(sortByAsync, 2)
