
/**
 * Check if three points form a tris
 *
 * This is the core algorithm of tris3d
 *
 * @param {Array} a
 * @param {Array} b
 * @param {Array} c
 *
 * @return {Boolean} response
 */

function isTris (a, b, c) {
  var center = indexOfCoordinates([1, 1, 1])
  
  return false
}

exports.isTris = isTris

/**
 * Semisum operator in Z3 x Z3 x Z3 space
 *
 * Z3 is the group of arithmetic modulo 3.
 * Note that in Z3, mutliply and divide by 2 has the same result: in deed
 *
 * ```
 * 0 -> 0
 * 1 -> 2
 * 2 -> 1
 * ```
 *
 * So, in Z3
 *
 * ```
 * (a + b) * 2 = (a + b) / 2
 * ```
 *
 * Since I'm wirking with integers I prefer to multiply by 2 to avoid floats.

 * Z3xZ3xZ3 is the cartesian product of Z3, seen as a 3 dimensional space immersed in R3.
 *
 *
 * @param {Number} index1
 * @param {Number} index2
 *
 * @return {Number} index
 */

function semiSumInZ3xZ3xZ3 (index1, index2) {
  var point1 = coordinatesOfIndex(index1)
    , point2 = coordinatesOfIndex(index2)
    , x, y, z
    , index

  x = ((point1[0] + point2[0]) * 2) % 3
  y = ((point1[1] + point2[1]) * 2) % 3
  z = ((point1[2] + point2[2]) * 2) % 3

  index = indexOfCoordinates([x, y, z])

  return index
}

exports.semiSumInZ3xZ3xZ3 = semiSumInZ3xZ3xZ3

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

