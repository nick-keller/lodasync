const flowFn = (queue, fn) => queue.then(fn)

/**
 * @function flowAsync
 * @param {...function} callbacks
 * @return {function}
 */
module.exports.default = (...callbacks) => input => callbacks.reduce(
  flowFn,
  Promise.resolve(input),
)


