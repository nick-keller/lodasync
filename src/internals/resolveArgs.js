module.exports.resolveArgs = callback => (...args) => Promise
  .all(args)
  .then(resolvedArgs => callback(...resolvedArgs))
