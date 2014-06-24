
/**
 * Check if tuple is a tris
 *
 */

function isTris () {
  return false
}

exports.isTris = isTris

/**
 * Convert coordinates to index
 *
 * @param {Number} x integer in [0, 1, 2]
 * @param {Number} y integer in [0, 1, 2]
 * @param {Number} z integer in [0, 1, 2]
 *
 * @return {Number} index
 */

function indexOfCoordinates (x, y, z) {
  return x + 3 * y + 9 * z
}

exports.indexOfCoordinates = indexOfCoordinates

/**
 * Convert index to coordinates
 *
 * @param {Number} index from 0 to 26
 *
 * @return {Object} coordinates of integers in [0, 1, 2]
 */

function coordinatesOfIndex (index) {
  var x, y, z

  x = index % 3
  y = ((index - x) % 9) / 3
  z = (index - x - (3 * y)) / 9

  return {x: x, y: y, z: z}
}

