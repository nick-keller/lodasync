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

module.exports.propsAsync = object => Promise
  .resolve(object)
  .then(propsFn)
