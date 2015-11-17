module.exports = function (version) {
  var Block = require('prismarine-block')(version);

  return function (id, data, pos) {
    Block.call(this, id, null, data);
    this.position = pos;
  };
};
