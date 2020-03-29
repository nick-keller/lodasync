const flowFn = (queue, fn) => queue.then(fn)

module.exports.flowAsync = (...callbacks) => (input) => callbacks.reduce(
  flowFn,
  Promise.resolve(input),
)


