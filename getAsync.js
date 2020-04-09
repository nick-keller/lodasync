const getOrAsync = require('./getOrAsync').default

/**
 * @function getAsync
 * @param {string|string[]} path
 * @param {*} object
 * @return {*}
 */
module.exports.default = getOrAsync(undefined)
