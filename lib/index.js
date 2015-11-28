var nbt = require('prismarine-nbt');
var vec3 = require('vec3');

module.exports = function (version) {
  var newBlock = require('./lib/block')(version);
  var Entity = require('./lib/entity');
  Schematic.block = newBlock;

  Schematic.parse = function (data, callback) {
    if (!callback) callback = function (err) {
      if (err) throw err;
    };

    nbt.parse(data, function (err, data) {
      if (err) callback(err);
      callback(err, new Schematic(data));
    });
  };

  function Schematic(raw) {
    this._ = raw.value.value;
    this.raw = raw;

    var entities = this._.Entities.value.value;
    var blocks = this._.Blocks.value;
    var blockEntities = this._.TileEntities.value.value;

    this.width = this._.Width.value;
    this.height = this._.Height.value;
    this.length = this._.Length.value;

    this.entities = [];
    this.blockEntities = [];
    this.blocks = [];

    for (var i = 0; i < entities.length; i++)
      this.entities.push(new Entity(entities[i]));

    // Parse blocks
    var pos = vec3(), j, blockEntity;
    for (i = 0; i < blocks.length; i++) {

      blockEntities.some(function (block) {
        if (pos.equals(vec3(block.x.value, block.y.value, block.z.value))) {
          blockEntity = block;
          return true;
        }
      });

      var block = newBlock(blocks[i],
        this._.Data.value[i], pos.clone(), blockEntity);

      if (blockEntity) this.blockEntities.push(block);

      this._setBlock(pos, block);

      // Increment position
      if (pos.x < (this.width - 1))
        pos.x++;
      else if (pos.y < (this.height - 1)) {
        pos.x = 0;
        pos.y++;
      } else {
        pos.x = 0;
        pos.y = 0;
        pos.z++;
      }
    }
  }

  Schematic.prototype.getBlock = function (x, y, z) {
    if (typeof x === 'object') {
      // x is Vec3
      y = x.y;
      z = x.z;
      x = x.x;
    }

    // TODO Maybe throw error instead of returning null?

    try {
      // if [x] & [y] exist but not [z], replace undefined with null
      return this.blocks[x][y][z] || null;
    } catch (err) {
      return null; // if either [x] or [y] doesn't exist
    }
  };

  Schematic.prototype.updateRaw = function () {
    var ids = this._.Blocks.value.value = [];
    var data = this._.Data.value.value = [];
    var blockEntities = this._.TileEntities.value.value = [];

    var empty = [];
    var currArr = this.blocks, block, y, z;
    for (var x = 0; x < this.width; x++) {
      currArr = currArr[x] ? currArr[x] : empty;
      for (y = 0; y < this.height; y++) {
        currArr = currArr[y] ? currArr[y] : empty;
        for (z = 0; z < this.length; z++) {
          block = currArr[z];
          if (block) {
            ids.push(block.id);
            data.push(block.metadata);
            if (block.blockEntityType)
              blockEntities.push(block.updateRaw());
          } else {
            ids.push(0);
            data.push(0);
          }
        }
      }
    }

    // TODO entities
  };

  Schematic.prototype.setBlock = function (pos, y, z, id, data) {
    // TODO block entities
    if (typeof pos === 'object') {
      pos = pos.clone();
      id = y;
      data = z;
    } else {
      pos = vec3(pos, y, z);
    }

    this._setBlock(pos, newBlock(id, data || 0, pos));
  };

  Schematic.prototype._setBlock = function (pos, block) {
    ensureArr(this.blocks, pos.x);
    ensureArr(this.blocks[pos.x], pos.y);
    this.blocks[pos.x][pos.y][pos.z] = block;
  };

  return Schematic;
};

// NOTE ensureArr() only sets to an array if it used to be falsey
function ensureArr(base, prop) {
  if (!base[prop]) base[prop] = [];
}
