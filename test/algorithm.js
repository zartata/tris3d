
var should = require('should')
  , tris3d = require('../index')

var algorithm = tris3d.algorithm

var coordOf = algorithm.coordinatesOfIndex
  , indexOf = algorithm.indexOfCoordinates
  , isTris  = algorithm.isTris
  , semiSum = algorithm.semiSumInZ3xZ3xZ3

describe('algorithm', function () {
  describe('indexOfCoordinates', function () {
    it('convert Z3xZ3xZ3 point to 0..26 integer', function () {
      indexOf([0, 0, 0]).should.eql(0)
      indexOf([1, 0, 0]).should.eql(1)
      indexOf([2, 0, 0]).should.eql(2)
      indexOf([0, 1, 0]).should.eql(3)
      indexOf([1, 1, 0]).should.eql(4)
      indexOf([2, 1, 0]).should.eql(5)
      indexOf([0, 2, 0]).should.eql(6)
      indexOf([1, 2, 0]).should.eql(7)
      indexOf([2, 2, 0]).should.eql(8)
      indexOf([0, 0, 1]).should.eql(9)
      indexOf([1, 0, 1]).should.eql(10)
      indexOf([2, 0, 1]).should.eql(11)
      indexOf([0, 1, 1]).should.eql(12)
      indexOf([1, 1, 1]).should.eql(13)
      indexOf([2, 1, 1]).should.eql(14)
      indexOf([0, 2, 1]).should.eql(15)
      indexOf([1, 2, 1]).should.eql(16)
      indexOf([2, 2, 1]).should.eql(17)
      indexOf([0, 0, 2]).should.eql(18)
      indexOf([1, 0, 2]).should.eql(19)
      indexOf([2, 0, 2]).should.eql(20)
      indexOf([0, 1, 2]).should.eql(21)
      indexOf([1, 1, 2]).should.eql(22)
      indexOf([2, 1, 2]).should.eql(23)
      indexOf([0, 2, 2]).should.eql(24)
      indexOf([1, 2, 2]).should.eql(25)
      indexOf([2, 2, 2]).should.eql(26)
    })
  })

  describe('coordinatesOfIndex', function () {
    it('convert 0..26 integer to Z3xZ3xZ3 point', function () {
      coordOf( 0).should.eql([0, 0 ,0])
      coordOf( 1).should.eql([1, 0 ,0])
      coordOf( 2).should.eql([2, 0 ,0])
      coordOf( 3).should.eql([0, 1 ,0])
      coordOf( 4).should.eql([1, 1 ,0])
      coordOf( 5).should.eql([2, 1 ,0])
      coordOf( 6).should.eql([0, 2 ,0])
      coordOf( 7).should.eql([1, 2 ,0])
      coordOf( 8).should.eql([2, 2 ,0])
      coordOf( 9).should.eql([0, 0 ,1])
      coordOf(10).should.eql([1, 0 ,1])
      coordOf(11).should.eql([2, 0 ,1])
      coordOf(12).should.eql([0, 1 ,1])
      coordOf(13).should.eql([1, 1 ,1])
      coordOf(14).should.eql([2, 1 ,1])
      coordOf(15).should.eql([0, 2 ,1])
      coordOf(16).should.eql([1, 2 ,1])
      coordOf(17).should.eql([2, 2 ,1])
      coordOf(18).should.eql([0, 0 ,2])
      coordOf(19).should.eql([1, 0 ,2])
      coordOf(20).should.eql([2, 0 ,2])
      coordOf(21).should.eql([0, 1 ,2])
      coordOf(22).should.eql([1, 1 ,2])
      coordOf(23).should.eql([2, 1 ,2])
      coordOf(24).should.eql([0, 2 ,2])
      coordOf(25).should.eql([1, 2 ,2])
      coordOf(26).should.eql([2, 2 ,2])
    })
  })

  describe('semiSuminZ3xZ3xZ3', function () {
    it('return index of midpoint in Z3 x Z3 x Z3 space', function () {
      semiSum( 0,  1).should.eql(2)
      semiSum( 2,  3).should.eql(7)
      semiSum( 9, 10).should.eql(11)
      semiSum(10, 13).should.eql(16)
      semiSum(11, 12).should.eql(16)
      semiSum(24, 25).should.eql(26)
      // TODO test more combinations
    })

    it('is simmetric', function () {
      for (var i = 0; i < 27; i++)
        for (var j = 0; j < 27; j++)
          semiSum(i, j).should.eql(semiSum(j, i))
    })

    it('is cyclic', function () {
      var k

      for (var i = 0; i < 27; i++)
        for (var j = 0; j < 27; j++) {
          k = semiSum(i, j)

          semiSum(j, k).should.eql(i)
          semiSum(k, i).should.eql(j)
        }
    })
  })

  describe('isTris', function () {
    it('is invariant under permutation or arguments', function () {
      for (var i = 0; i < 27; i++)
        for (var j = 0; j < i; j++)
          for (var k = 0; k < j; k++) {
            // cyclic
            isTris(i, j, k).should.eql(isTris(j, k, i))
            isTris(j, k, i).should.eql(isTris(k, i, j))
            // transposition
            isTris(i, j, k).should.eql(isTris(j, i, k))
            isTris(i, j, k).should.eql(isTris(i, k, j))
            isTris(i, j, k).should.eql(isTris(k, j, i))
          }
    })

    it('is false when c is not semiSum of a, b', function () {
      for (var i = 0; i < 27; i++)
        for (var j = 0; j < i; j++)
          for (var k = 0; k < j; k++)
            if (k !== semiSum(i, j))
              isTris(i, j, k).should.be.not.ok
    })

    it('is true when semiSum condition holds and some point is the center'/*, function () {
      isTris(12, 13, 14).should.be.ok
      isTris(10, 13, 16).should.be.ok
    }*/)
    
    it('works properly', function () {
      //isTris(0, 1, 2).should.be.ok
      isTris(0, 1, 3).should.be.ko
    })
  })
})

