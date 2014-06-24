
/**
 * Check if tuple is a tris
 *
 */

function isTris () {
  return false
}

exports.isTris = isTris

/**
 * Convert point in Z3xZ3xZ3 to index
 *
 * @param {Array} coordinates
 *
 * @return {Number} index
 */

function indexOfCoordinates (point) {
  return point[0] + 3 * point[1] + 9 * point[2]
}

exports.indexOfCoordinates = indexOfCoordinates

/**
 * Convert index to point in Z3xZ3xZ3
 *
 * @param {Number} index
 *
 * @return {Array} coordinates
 */

function coordinatesOfIndex (index) {
  var x, y, z

  x = index % 3
  y = ((index - x) % 9) / 3
  z = (index - x - (3 * y)) / 9

  return [x, y, z]
}

exports.coordinatesOfIndex = coordinatesOfIndex

