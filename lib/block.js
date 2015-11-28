var vec3 = require('vec3');
var commandStats = require('./entity').commandStats;

module.exports = function (version) {
  var Block = require('prismarine-block')(version);
  var Item = require('prismarine-item')(version);
  var itemsByName = require('minecraft-data')(version).itemsByName;

  return function (id, data, pos, raw) {
    var self = new Block(id, null, data);
    self.position = pos;

    if (raw) {
      self.raw = raw;
      self.blockEntityType = raw.id.value;

      switch (self.blockEntityType) {
        case 'Banner':
          self.background = raw.Base.value;
          self.patterns = [];
          var patterns = raw.Patterns.value.value, pattern;
          for (var i = 0; i < patterns.length; i++) {
            pattern = patterns[i];
            self.patterns.push({
              color: pattern.Color.value,
              pattern: pattern.Pattern.value
            });
          }
          break;
        case 'Beacon':
          self.lockKey = raw.Lock.value;
          self.levels = raw.Levels.value;
          self.powers = {
            primary: raw.Primary.value,
            secondary: raw.Secondary.value
          };
          break;
        case 'Cauldron':
          // Brewing stand
          container(self, raw);
          self.brewTime = raw.BrewTime.value;
          if (raw.Fuel) self.fuel = raw.Fuel.value;
          break;
        case 'Chest':
          container(self, raw);
          if (raw.LootTable) self.lootTable = raw.LootTable.value;
          if (raw.LootTableSeed) self.lootTableSeed = raw.LootTableSeed.value;
          break;
        case 'Comparator':
          self.outputSignal = raw.OutputSignal.value;
          break;
        case 'Control':
          // Command block
          if (raw.CustomName) self.customName = raw.CustomName.value;
          self.lockKey = raw.Lock.value;
          commandStats(self, raw);
          self.command = raw.Command.value;
          self.successCount = raw.SuccessCount.value;
          self.trackOutput = Boolean(raw.TrackOutput.value);
          if (typeof raw.powered !== 'undefined') self.powered = Boolean(raw.powered.value);
          if (typeof raw.auto !== 'undefined') self.auto = Boolean(raw.auto.value);
          break;
        case 'Dropper':
          container(self, raw);
          break;
        case 'EnchantTable':
          if (raw.CustomName) self.customName = raw.CustomName.value;
          break;
        case 'EndGateway':
          self.age = raw.Age.value;
          self.exactTeleport = Boolean(raw.ExactTeleport.value);
          var exit = raw.ExitPortal.value;
          self.exitPortal = vec3(exit.X.value, exit.Y.value, exit.Z.value);
          break;
        case 'FlowerPot':
          self.flower = new Block(raw.Item.value, raw.Data.value);
          break;
        case 'Furnace':
          container(self, raw);
          self.burnTimeLeft = raw.BurnTime.value;
          self.cookTime = raw.CookTime.value;
          self.cookTimeTotal = raw.CookTimeTotal.value;
          break;
        case 'Hopper':
          container(self, raw);
          self.transferCooldown = raw.TransferCooldown.value;
          break;
        case 'MobSpawner':
          // TODO
          break;
        case 'Music':
          self.note = raw.note.value;
          if (typeof raw.powered !== 'undefined') self.powered = Boolean(raw.powered.value);
          break;
        case 'Piston':
          // TODO...
      }
      self.updateRaw = updateRaw;
    }

    function container() {
      if (raw.CustomName) self.customName = raw.CustomName.value;
      self.lockKey = raw.Lock.value;
      self.items = [];
      raw.Items.value.value.forEach(function (item) {
        var data = itemsByName[item.id.value.split(':')[1]];
        self.items.push(new Item(data ? data.id : 1,
          item.Count.value, item.Damage.value, item.tag ? item.tag.value : {}));
      });
    }

    return self;
  };
};

function updateRaw() {
  // TODO
  return this.raw;
}
