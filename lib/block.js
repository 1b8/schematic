var util = require('util');

module.exports = function (version) {
  var PrismarineBlock = require('prismarine-block')(version);

  function Block(id, data, pos) {
    PrismarineBlock.call(this, id, null, data);
    this.position = pos;
  };
  util.inherits(Block, PrismarineBlock);
  return Block;
};
