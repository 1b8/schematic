var vec3 = require('vec3');
var Entity = require('prismarine-entity');

module.exports = loader;
function loader(version) {
  var mcData = require('minecraft-data')(version);

  return function (raw) {
    var name = raw.id.value;
    var rot = raw.Rotation.value.value;
    var data = mcData.entitiesByName[name];

    var self = new Entity(data.id);
    self.raw = raw;

    // Set type
    if (data)
      if (name === 'XPOrb') {
        self.type = 'orb';
        self.count = 0; // TODO
      } else if (data.type.match(/e mobs$/)) mobOrObject('mob');
      else switch (data.type) {
        case 'NPCs':
          mobOrObject('mob'); break;
        case 'Drops':
        case 'Immobile':
        case 'Projectiles':
        case 'Blocks':
        case 'Vehicles':
          mobOrObject('object');
          self.objectType = data.type; // ???
          break;
        default:
          self.type = 'other';
      }

    function mobOrObject(type) {
      self.type = type;
      self.displayName = data.displayName;
      self.entityType = data.id; // ???
      self.kind = data.type; // ???
      self.name = name; // ???

      if (type === 'mob') self.mobType = name; // ???
    }

    self.position = vec3(raw.Pos.value.value);
    self.velocity = vec3(raw.Motion.value.value); // metres per tick
    self.yaw = rot[0];
    self.pitch = rot[1];

    self.height = 0; // TODO ???

    self.onGround = Boolean(raw.OnGround.value);

    // TODO self.setEquipment();

    // TODO self.metadata = [...];
    // TODO self.health & food

    // not prismarine-entity stuff
    self.fallDistance = raw.FallDistance.value;
    self.fireTicks = raw.Fire.value;
    self.air = raw.Air.value;
    self.invulnerable = Boolean(raw.Invulnerable.value);
    self.portalCooldown = raw.PortalCooldown.value;
    self.uuid = [raw.UUIDMost.value, raw.UUIDLeast.value];
    self.customName = raw.CustomName ? raw.CustomName.value : '';
    self.customNameVisible = typeof raw.CustomNameVisible !== 'undefined' ? Boolean(raw.CustomNameVisible.value) : false;
    self.silent = typeof raw.Silent !== 'undefined' ? Boolean(raw.Silent) : false;
    if (raw.Passengers) self.rider = new Entity(raw.Passengers.value); // Added in 1.9
    self.glowing = typeof raw.Glowing !== 'undefined' ? Boolean(raw.Glowing.value) : false;
    self.nbt = raw.Tags ? raw.Tags.value.value : [];
    commandStats(self, raw);
    return self;
  };
};

function commandStats(self, raw) {
  if (raw.CommandStats) {
    var stats = raw.CommandStats.value;
    self.commandStats = {};
    for (var cap in stats)
      self.commandStats[cap[0].toLowerCase() + cap.substr(1)] = stats[cap].value;
    /*
      self.commandStats = {
        successCountObjective: stats.SuccessCountObjective.value,
        successCountName: stats.SuccessCountName.value,
        affectedBlocksObjective: stats.AffectedBlocksObjective.value,
        affectedBlocksName: stats.AffectedBlocksName.value,
        affectedEntitiesObjective: stats.AffectedEntitiesObjective.value,
        affectedEntitiesName: stats.AffectedEntitiesName.value,
        affectedItemsObjective: stats.AffectedItemsObjective.value,
        affectedItemsName: stats.AffectedItemsName.value,
        queryResultObjective: stats.QueryResultObjective.value,
        queryResultName: stats.QueryResultName.value
      };
    */
  }
}
loader.commandStats = commandStats;

// TODO Mobs & breedable mobs, tameable mobs, Projectiles, Items, XPOrbs, Vehicles, dynamic tiles, & other
