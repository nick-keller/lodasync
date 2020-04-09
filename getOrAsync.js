const reduceAsync = require('./reduceAsync').default
const { unCurry } = require('./internals/unCurry')

const reduceFn = (obj, key) => {
  if (obj === null || obj === undefined) {
    return undefined
  }

  return obj[key]
}

const castPathArray = path => Array.isArray(path)
  ? path
  : path.split('.')

const getOrAsync = defaultValue => path => object => Promise
  .resolve(path)
  .then(castPathArray)
  .then(reduceAsync(reduceFn, object))
  .then(value => value === undefined ? defaultValue : value)

/**
 * @function getOrAsync
 * @param {*} defaultValue
 * @param {string|string[]} path
 * @param {*} object
 * @return {*}
 */
module.exports.default = unCurry(getOrAsync, 3)
