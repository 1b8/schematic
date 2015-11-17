var vec3 = require('vec3');
var commandStats = require('./entity').commandStats;
var util = require('util');

module.exports = function (version) {
  var Block = require('./block')(version);
  var Item = require('prismarine-item')(version);
  var itemsByName = require('minecraft-data')(version).itemsByName;

  function container(self, raw) {
    if (raw.CustomName) self.customName = raw.CustomName.value;
    self.lockKey = raw.Lock.value;
    self.items = [];
    raw.Items.value.value.forEach(function (item) {
      var data = itemsByName[item.id.value.split(':')[1]];
      self.items.push(new Item(data ? data.id : 1,
        item.Count.value, item.Damage.value, item.tag ? item.tag.value : {}));
    });
  }

  function BlockEntity(schem, raw) {
    Block.apply(this, schem._blockArgs(vec3(raw.x.value, raw.y.value, raw.z.value)));
    this.raw = raw;

    switch (raw.id.value) {
      case 'Banner':
        this.background = raw.Base.value;
        this.patterns = [];
        var patterns = raw.Patterns.value.value, pattern;
        for (var i = 0; i < patterns.length; i++) {
          pattern = patterns[i];
          this.patterns.push({
            color: pattern.Color.value,
            pattern: pattern.Pattern.value
          });
        }
        break;
      case 'Beacon':
        this.lockKey = raw.Lock.value;
        this.levels = raw.Levels.value;
        this.powers = {
          primary: raw.Primary.value,
          secondary: raw.Secondary.value
        };
        break;
      case 'Cauldron':
        // Brewing stand
        container(this, raw);
        this.brewTime = raw.BrewTime.value;
        if (raw.Fuel) this.fuel = raw.Fuel.value;
        break;
      case 'Chest':
        container(this, raw);
        if (raw.LootTable) this.lootTable = raw.LootTable.value;
        if (raw.LootTableSeed) this.lootTableSeed = raw.LootTableSeed.value;
        break;
      case 'Comparator':
        this.outputSignal = raw.OutputSignal.value;
        break;
      case 'Control':
        // Command block
        if (raw.CustomName) this.customName = raw.CustomName.value;
        this.lockKey = raw.Lock.value;
        commandStats(this, raw);
        this.command = raw.Command.value;
        this.successCount = raw.SuccessCount.value;
        this.trackOutput = Boolean(raw.TrackOutput.value);
        if (typeof raw.powered !== 'undefined') this.powered = Boolean(raw.powered.value);
        if (typeof raw.auto !== 'undefined') this.auto = Boolean(raw.auto.value);
        break;
      case 'Dropper':
        container(this, raw);
        break;
      case 'EnchantTable':
        if (raw.CustomName) this.customName = raw.CustomName.value;
        break;
      case 'EndGateway':
        this.age = raw.Age.value;
        this.exactTeleport = Boolean(raw.ExactTeleport.value);
        var exit = raw.ExitPortal.value;
        this.exitPortal = vec3(exit.X.value, exit.Y.value, exit.Z.value);
        break;
      case 'FlowerPot':
        this.flower = new Block(raw.Item.value, raw.Data.value);
        break;
      case 'Furnace':
        container(this, raw);
        this.burnTimeLeft = raw.BurnTime.value;
        this.cookTime = raw.CookTime.value;
        this.cookTimeTotal = raw.CookTimeTotal.value;
        break;
      case 'Hopper':
        container(this, raw);
        this.transferCooldown = raw.TransferCooldown.value;
        break;
      case 'MobSpawner':
        // TODO
        break;
      case 'Music':
        this.note = raw.note.value;
        if (typeof raw.powered !== 'undefined') this.powered = Boolean(raw.powered.value);
        break;
      case 'Piston':
        // TODO...
    }
  }
  util.inherits(BlockEntity, Block);
  return BlockEntity;
};
