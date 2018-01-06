var vec3 = require('vec3');

module.exports = function (raw) {
  var rot = raw.Rotation;
  switch (raw.Dimension) {
    case -1:
      this.dimension = 'nether';
      break;
    case 0:
      this.dimension = 'overworld';
      break;
    case 1:
      this.dimension = 'end';
  }
  this.raw = raw;
  this.id = raw.id;
  this.position = vec3(raw.Pos);
  this.velocity = vec3(raw.Motion); // metres per tick
  this.yaw = rot[0];
  this.pitch = rot[1];
  this.fallDistance = raw.FallDistance;
  this.fireTicks = raw.Fire;
  this.air = raw.Air;
  this.onGround = Boolean(raw.OnGround);
  this.invulnerable = Boolean(raw.Invulnerable);
  this.portalCooldown = raw.PortalCooldown;
  this.uuid = [raw.UUIDMost, raw.UUIDLeast];
  this.customName = raw.CustomName ? raw.CustomName : '';
  this.customNameVisible = typeof raw.CustomNameVisible !== 'undefined' ? Boolean(raw.CustomNameVisible) : false;
  this.silent = typeof raw.Silent !== 'undefined' ? Boolean(raw.Silent) : false;
  if (raw.Passengers) this.rider = new Entity(raw.Passengers); // Added in 1.9
  this.glowing = typeof raw.Glowing !== 'undefined' ? Boolean(raw.Glowing) : false;
  this.nbt = raw.Tags ? raw.Tags : [];
  commandStats(this, raw);
};

function commandStats(self, raw) {
  if (raw.CommandStats) {
    var stats = raw.CommandStats;
    self.commandStats = {
      successCountObjective: stats.SuccessCountObjective,
      successCountName: stats.SuccessCountName,
      affectedBlocksObjective: stats.AffectedBlocksObjective,
      affectedBlocksName: stats.AffectedBlocksName,
      affectedEntitiesObjective: stats.AffectedEntitiesObjective,
      affectedEntitiesName: stats.AffectedEntitiesName,
      affectedItemsObjective: stats.AffectedItemsObjective,
      affectedItemsName: stats.AffectedItemsName,
      queryResultObjective: stats.QueryResultObjective,
      queryResultName: stats.QueryResultName
    };
  }
}
module.exports.commandStats = commandStats;

// TODO Mobs & breedable mobs, tameable mobs, Projectiles, Items, XPOrbs, Vehicles, dynamic tiles, & other
