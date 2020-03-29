const resolveAll = arr => Promise.all(arr)

module.exports.resolveCollectionAndValues = collection => Promise
  .resolve(collection)
  .then(resolveAll)
