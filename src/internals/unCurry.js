const reduceArgsFn = (fn, arg) => fn(arg)

const unCurry = (callback, numberOfArgs) => (...args) => {
  const result = args
    .slice(0, numberOfArgs)
    .reduce(reduceArgsFn, callback)

  if (args.length < numberOfArgs - 1) {
    return unCurry(result, numberOfArgs - args.length)
  }

  return result
}

module.exports.unCurry = unCurry
