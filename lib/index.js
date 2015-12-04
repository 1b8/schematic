var nbt = require('prismarine-nbt');
var vec3 = require('vec3');
var newBlock, newEntity;

module.exports = function (version) {
  newBlock = require('./block')(version);
  newEntity = require('./entity')(version);
  return Schematic;
};

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

  var offX = this._.WEOffsetX;
  if (offX) this.we = {
    offset: vec3(offX.value, this._.WEOffsetY.value, this._.WEOffsetZ.value),
    origin: vec3(this._.WEOriginX.value, this._.WEOriginY.value, this._.WEOriginZ.value)
  };

  this.entities = [];
  this.blockEntities = [];
  this.blocks = [];

  for (var i = 0; i < entities.length; i++)
    this.entities.push(newEntity(entities[i]));

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

Schematic.prototype.forEachBlock = function (callback) {
  var y, z;

  loop:
  for (var x = 0; x < this.width; x++)
    for (y = 0; y < this.height; y++)
      for (z = 0; z < this.length; z++)
        if (callback(this.getBlock(x, y, z), vec3(x, y, z))) break loop;
};

Schematic.prototype.updateRaw = function () {
  var ids = this._.Blocks.value.value = [];
  var data = this._.Data.value.value = [];
  var blockEntities = this._.TileEntities.value.value = [];

  this.forEachBlock(function (block) {
    if (block) {
      ids.push(block.id);
      data.push(block.metadata);
      if (block.blockEntityType)
        blockEntities.push(block.updateRaw());
    } else {
      ids.push(0);
      data.push(0);
    }
  });

  // TODO entities
};

Schematic.prototype.setBlock = function (pos, y, z, id, data) {
  var self = this;
  if (typeof pos === 'object') {
    pos = pos.clone();
    id = y;
    data = z;
  } else {
    pos = vec3(pos, y, z);
  }

  update('x', 'width');
  update('y', 'height');
  update('z', 'length');

  this._setBlock(pos, newBlock(id || 0, data || 0, pos));

  // TODO block entities

  function update(axis, attr) {
    var v = pos[axis];
    if (v >= self[attr]) self[attr] = v+1;
  }
};

Schematic.prototype._setBlock = function (pos, block) {
  ensureArr(this.blocks, pos.x);
  ensureArr(this.blocks[pos.x], pos.y);
  this.blocks[pos.x][pos.y][pos.z] = block;
};

// NOTE ensureArr() only sets to an array if it used to be falsey
function ensureArr(base, prop) {
  if (!base[prop]) base[prop] = [];
}
