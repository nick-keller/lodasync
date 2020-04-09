const all = value => Promise.all(value)

const fromEntries = Object.fromEntries || (entries => entries.reduce(
  (acc, [key, value]) => {
    acc[key] = value
    return acc
  },
  {},
))

const propsFn = object => Promise
  .all(Object.entries(object).map(all))
  .then(fromEntries)

/**
 * @async
 * @function propsAsync
 * @param {Object} object
 * @return {Promise<Object>}
 */
module.exports.default = object => Promise
  .resolve(object)
  .then(propsFn)
