var fs = require('fs');
var nbt = require('prismarine-nbt');
var vec3 = require('vec3');

module.exports = function (version) {
  var Block = require('./lib/block')(version);
  var BlockEntity = require('./lib/block-entity')(version);
  var block = require('./lib/pos')(version).block;

  Schematic.read = function (data, callback) {
    if (!callback) callback = function (err) {
      if (err) throw err;
    }

    nbt.parse(data, function (err, data) {
      if (err) callback(err);
      callback(err, new Schematic(data));
    });
  };

  function Schematic(raw) {
    this._ = raw.value.value;
    var entities = this._.Entities.value.value;
    var blockEntities = this._.TileEntities.value.value;

    this.raw = raw;
    this.width = this._.Width.value;
    this.height = this._.Height.value;
    this.length = this._.Length.value;
    this.entities = [];
    this.blockEntities = [];
    for (var i = 0; i < entities.length; i++)
    this.entities.push(new Entity(entities[i]));
    for (i = 0; i < blockEntities.length; i++) {
      this.blockEntities.push(new BlockEntity(this._, blockEntities[i]));
    }
  }

  Schematic.prototype.blockAt = function (x, y, z) {
    var vec = vec3(x, y, z);

    // Check if it's a block entity
    var blockEntity;
    for (var i = 0; i < this.blockEntities.length; i++) {
      blockEntity = this.blockEntities[i];
      if (blockEntity.position.equals(vec)) return blockEntity;
    }
    return block(this._, pos);
  };

  return Schematic;
};
