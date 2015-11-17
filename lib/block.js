var vec3 = require('vec3');

module.exports = function (version) {
  var mcData = require('minecraft-data')(version);

  return function (id, data, pos) {
    this.data = data;
    this.position = pos;
    var data = mcData.blocks[id];
    for (var key in data) this[key] = data[key];
  };
};
