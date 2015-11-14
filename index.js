var fs = require('fs');
var util = require('util');
var nbt = require('prismarine-nbt');
var vec3 = require('vec3');

module.exports = function (version) {
  var Block = require('prismarine-block')(version);
  var mcData = require('minecraft-data')(version);

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

    this.raw = raw;
    this.width = raw.Width.value;
    this.height = raw.Height.value;
    this.length = raw.Length.value;

    this.entities = [];
    for (var i = 0; i < entities.length; i++) {
      this.entities.push(new Entity(entities[i]));
    }
  }

  Schematic.prototype.blockAt = function (x, y, z) {
    var addr = (y * this.length + z) * this.width + x;
    var block = new Block(this.raw.Blocks.value[addr], null, this.raw.Data.value[addr]);
    block.position = vec3(x, y, z);
    return block;
  };

  return Schematic;
};
