var vec3 = require('vec3');
var commandStats = require('./entity').commandStats;
var util = require('util');

module.exports = function (version) {
  var Block = require('./block')(version);
  var Item = require('prismarine-item')(version);
  var itemsById = require('minecraft-data')(version).items;

  function container(self, raw) {
    if (raw.CustomName) self.customName = raw.CustomName;
    self.lockKey = raw.Lock;
    self.items = [];
    raw.Items.forEach(function (item) {
      var data = itemsById[item.id];
      self.items.push(new Item(data ? data.id : 1,
        item.Count, item.Damage, item.tag ? item.tag : {}));
    });
  }

  function BlockEntity(schem, raw) {
    Block.apply(this, schem._blockArgs(vec3(raw.x, raw.y, raw.z)));
    this.raw = raw;

    switch (raw.id) {
      case 'Banner':
        this.background = raw.Base;
        this.patterns = [];
        var patterns = raw.Patterns, pattern;
        for (var i = 0; i < patterns.length; i++) {
          pattern = patterns[i];
          this.patterns.push({
            color: pattern.Color,
            pattern: pattern.Pattern
          });
        }
        break;
      case 'Beacon':
        this.lockKey = raw.Lock;
        this.levels = raw.Levels;
        this.powers = {
          primary: raw.Primary,
          secondary: raw.Secondary
        };
        break;
      case 'Cauldron':
        // Brewing stand
        container(this, raw);
        this.brewTime = raw.BrewTime;
        if (raw.Fuel) this.fuel = raw.Fuel;
        break;
      case 'Chest':
        container(this, raw);
        if (raw.LootTable) this.lootTable = raw.LootTable;
        if (raw.LootTableSeed) this.lootTableSeed = raw.LootTableSeed;
        break;
      case 'Comparator':
        this.outputSignal = raw.OutputSignal;
        break;
      case 'Control':
        // Command block
        if (raw.CustomName) this.customName = raw.CustomName;
        this.lockKey = raw.Lock;
        commandStats(this, raw);
        this.command = raw.Command;
        this.successCount = raw.SuccessCount;
        this.trackOutput = Boolean(raw.TrackOutput);
        if (typeof raw.powered !== 'undefined') this.powered = Boolean(raw.powered);
        if (typeof raw.auto !== 'undefined') this.auto = Boolean(raw.auto);
        break;
      case 'Dropper':
        container(this, raw);
        break;
      case 'EnchantTable':
        if (raw.CustomName) this.customName = raw.CustomName;
        break;
      case 'EndGateway':
        this.age = raw.Age;
        this.exactTeleport = Boolean(raw.ExactTeleport);
        var exit = raw.ExitPortal;
        this.exitPortal = vec3(exit.X, exit.Y, exit.Z);
        break;
      case 'FlowerPot':
        this.flower = new Block(raw.Item, raw.Data);
        break;
      case 'Furnace':
        container(this, raw);
        this.burnTimeLeft = raw.BurnTime;
        this.cookTime = raw.CookTime;
        this.cookTimeTotal = raw.CookTimeTotal;
        break;
      case 'Hopper':
        container(this, raw);
        this.transferCooldown = raw.TransferCooldown;
        break;
      case 'MobSpawner':
        // TODO
        break;
      case 'Music':
        this.note = raw.note;
        if (typeof raw.powered !== 'undefined') this.powered = Boolean(raw.powered);
        break;
      case 'Piston':
        // TODO...
    }
  }
  util.inherits(BlockEntity, Block);
  return BlockEntity;
};
