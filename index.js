var fs = require('fs'),
    nbt = require('prismarine-nbt'),
    vec3 = require('vec3');

module.exports = function (version) {
  var Block = require('prismarine-block')(version);

  function Schematic(raw) {
    this.raw = raw;
    this.width = raw.Width.value;
    this.height = raw.Height.value;
    this.length = raw.Length.value;
  }

  Schematic.prototype.blockAt = function (x, y, z) {
    var addr = (y * this.length + z) * this.width + x;
    var block = new Block(this.raw.Blocks.value[addr], null, this.raw.Data.value[addr]);
    block.position = vec3(x, y, z);
    return block;
  };

  return {
    read: function (path, callback) {
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
    }
  };
};
