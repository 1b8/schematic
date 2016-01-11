var fs = require('fs');
var Schematic = require('../')('1.8');
var assert = require('assert');
var Vec3 = require('vec3').Vec3;
var util = require('util');

describe('schematic', function () {
  var schem;

  before(function (done) {
    var num = ~~(Math.random() * 3) + 1;
    console.log('Testing schematic ' + num);
    fs.readFile(__dirname + '/schems/test' + num + '.schematic', function (err, data) {
      if (err) throw err;

      Schematic.parse(data, function (err, _schem) {
        if (err) throw err;

        schem = _schem;
        // console.log(util.inspect(schem, {colors: true}));
        done();
      });
    });
  });

  describe('getBlock', function () {
    it('returns null if out of range', function () {
      assert.strictEqual(schem.getBlock(3242, 241, 123), null);
    });
  });

  describe('setBlock', function () {
    var pos = new Vec3(0, 0, 0);

    beforeEach(function () {
      pos.translate(1, 0, 0);
    });

    it('works with (x, y, z, id)', function () {
      schem.setBlock(pos.x, pos.y, pos.z, 5);
      assert.strictEqual(schem.getBlock(pos).type, 5);
    });
    it('works with (x, y, z, id, data)', function () {
      schem.setBlock(pos.x, pos.y, pos.z, 5, 2);
      var b = g();
      assert.strictEqual(b.type, 5);
      assert.strictEqual(b.metadata, 2);
    });
    it('works with (pos, id)', function () {
      schem.setBlock(pos, 5);
      var b = g();
      assert.strictEqual(b.type, 5);
      assert.strictEqual(b.metadata, 0);
    });
    it('works with (pos, id, data)', function () {
      schem.setBlock(pos, 5, 2);
      var b = g();
      assert.strictEqual(b.type, 5);
      assert.strictEqual(b.metadata, 2);
    });
    it('corrects block.position', function () {
      schem.setBlock(pos, 5, 2);
      var b = g();
      assert.deepEqual(b.position, pos);
    });
    it('clones block.position', function () {
      schem.setBlock(pos, 5);
      var b = g();
      pos.translate(2, 3, 0);
      assert.notDeepEqual(pos, b.position);
    });
    it('updates schem.width, height, & length', function () {
      schem.setBlock(20, 20, 20, 7);
      assert.strictEqual(schem.width , 21);
      assert.strictEqual(schem.height, 21);
      assert.strictEqual(schem.length, 21);
    });

    function g() {
      return schem.getBlock(pos);
    }
  });

  describe('forEachBlock', function () {
    it('block.position is normally correct', function () {
      schem.forEachBlock(function (block, pos) {
        assert.strictEqual(block, schem.getBlock(pos));
      });
    });
    it('ends when the callback returns true (and starts with 0,0,0)', function () {
      schem.forEachBlock(function (block, pos) {
        assert(pos.equals(new Vec3(0,0,0)));
        return true;
      });
    });
  });
});
