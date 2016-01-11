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

    // The prismarine-entity specification is very unclear...

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
    self.customNameVisible = raw.CustomNameVisible ? Boolean(raw.CustomNameVisible.value) : false;
    self.silent = raw.Silent ? Boolean(raw.Silent.value) : false;
    if (raw.Passengers) self.rider = new Entity(raw.Passengers.value); // Added in 1.9
    self.glowing = raw.Glowing ? Boolean(raw.Glowing.value) : false;
    self.nbt = raw.Tags ? raw.Tags.value.value : [];
    commandStats(self, raw);

    self.updateRaw = function () {

      // set properties of raw

      // TODO self.count
      raw.id.value = this.name;
      unpackVec3('Pos', 'position');
      unpackVec3('Motion', 'velocity');
      raw.Rotation.value = [this.yaw, this.pitch];
      // TODO height ???
      raw.OnGround.value = +this.onGround;
      // TODO equipment metadata, health, food

      // non-prismarine-entity stuff
      raw.FallDistance.value = this.fallDistance;
      raw.Fire.value = this.fireTicks;
      raw.Air.value = this.air;
      raw.Invulnerable.value = +this.invulnerable;
      raw.PortalCooldown.value = this.portalCooldown;
      raw.UUIDMost.value = this.uuid[0];
      raw.UUIDLeast.value = this.uuid[1];
      // [raw.UUIDMost.value, raw.UUIDLeast.value] = this.uuid;
      if (this.customName === '') delete raw.CustomName;
      else {
        if (!raw.CustomName) raw.CustomName = {type: 'string'};
        raw.CustomName.value = this.customName;
      }

      if (this.customNameVisible) {
        if (!raw.CustomNameVisible) raw.CustomNameVisible = {type: 'byte'};
        raw.CustomNameVisible.value = 1;
      }

      if (this.silent) {
        if (!raw.Silent) raw.Silent = {type: 'byte'};
        raw.Silent.value = 1;
      }

      if (this.rider) {
        console.log('Warning: rider property not supported');
        if (!raw.Passengers) raw.Passengers = {type: 'compound'}; // ???
        raw.Passengers.value = this.rider.updateRaw();
      }

      // TODO glowing
      // TODO nbt
      // TODO commandStats

      return this.raw;
    };

    function unpackVec3(rawProp, vProp) {
      var v = self[vProp];
      raw[rawProp].value.value = [v.x, v.y, v.z];
    }

    return self;
  };
}

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
