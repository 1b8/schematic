module.exports = function (version) {
  var mcData = require('minecraft-data')(version);

  return function (raw) {
    this.count = raw.Count.value;
    this.slot = raw.Slot.value;
    this.data = raw.Damage.value;
    this.tag = raw.tag.value;
    var data = mcData.itemsByName[raw.id.value.split(':')[1]];
    for (var key in data) this[key] = data[key];
  };
};
