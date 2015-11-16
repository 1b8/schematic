module.exports = function (version) {
  var Block = require('./block')(version);

  return {
    block: function (l, w, raw, pos) {
      var index = (pos.y * l + pos.z) * w + pos.x;
      return new Block(raw.Blocks.value[index], raw.Data.value[index], pos);
    }
  }
};
