
var should = require('should')
  , tris3d = require('../index')

var algorithm = tris3d.algorithm

var indexOf = algorithm.indexOfCoordinates

describe('algorithm', function () {
  describe('indexOfCoordinates', function () {
    it('returns expansion in base 3', function () {
      indexOf(0, 0, 0).should.eql(0)
    })
  })
})

