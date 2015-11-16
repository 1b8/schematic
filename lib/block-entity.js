var vec3 = require('vec3');
var commandStats = require('./entity').commandStats;
var block = require('./pos').block;

module.exports = function (version) {
  var Block = require('./block')(version);
  var Item = require('./item')(version);

  function container(self, raw) {
    if (raw.CustomName) self.customName = raw.CustomName.value;
    self.lockKey = raw.Lock.value;
    self.items = [];
    var items = raw.Items.value.value;
    for (var i = 0; i < items.length; i++)
      self.items.push(new Item(items[i]));
  }

  return function (rawSchem, raw) {
    var pos = vec3(raw.x.value, raw.y.value, raw.z.value);
    var index = block(rawSchem, pos);
    Block.call(this, rawSchem.Blocks.value[index], rawSchem.Data.value[index], pos);
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
        this.flower = new Block(raw.Item.value, raw.Data.value, vec3(0,0,0));
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
  };
};
