var fs = require('fs');
var nbt = require('prismarine-nbt');
var vec3 = require('vec3');

module.exports = function (version) {
  var Block = require('./lib/block')(version);
  var BlockEntity = require('./lib/block-entity')(version);
  var block = require('./lib/pos')(version).block;

  Schematic.read = function (path, callback) {
    if (!callback) callback = function (err) {
      if (err) throw err;
    }

    fs.readFile(path, function (err, file) {
      if (err) callback(err);

      nbt.parse(file, function (err, data) {
        if (err) callback(err);
        callback(null, new Schematic(data.value.value));
      });
    });
  };

  Schematic.promiseRead = function (path) {
    return new Promise(function (resolve, reject) {
      Schematic.read(path, function (err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };

  function Schematic(raw) {
    var entities = raw.Entities.value.value;
    var blockEntities = raw.TileEntities.value.value;

    this.raw = raw;
    this.width = raw.Width.value;
    this.height = raw.Height.value;
    this.length = raw.Length.value;
    this.entities = [];
    this.blockEntities = [];
    for (var i = 0; i < entities.length; i++)
      this.entities.push(new Entity(entities[i]));
    for (i = 0; i < blockEntities.length; i++) {
      this.blockEntities.push(new BlockEntity(raw, blockEntities[i]));
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
    return block(this.raw, pos);
  };

  return Schematic;
};
