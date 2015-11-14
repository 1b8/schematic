function Entity(raw) {
  var rot = raw.Rotation.value.value;
  switch (raw.Dimension.value) {
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
  this.id = raw.id.value;
  this.position = vec3(raw.Pos.value.value);
  this.velocity = vec3(raw.Motion.value.value); // metres per tick
  this.yaw = rot[0];
  this.pitch = rot[1];
  this.fallDistance = raw.FallDistance.value;
  this.fireTicks = raw.Fire.value;
  this.air = raw.Air.value;
  this.onGround = Boolean(raw.OnGround.value);
  this.invulnerable = Boolean(raw.Invulnerable.value);
  this.portalCooldown = raw.PortalCooldown.value;
  this.uuid = {most: raw.UUIDMost.value, least: raw.UUIDLeast.value};
  this.customName = raw.CustomName ? raw.CustomName.value : '';
  this.customNameVisible = typeof raw.CustomNameVisible !== 'undefined' ? Boolean(raw.CustomNameVisible.value) : false;
  this.silent = typeof raw.Silent !== 'undefined' ? Boolean(raw.Silent) : false;
  if (raw.Passengers) this.rider = new Entity(raw.Passengers.value); // Added in 1.9
  this.glowing = typeof raw.Glowing !== 'undefined' ? Boolean(raw.Glowing.value) : false;
  this.tags = raw.Tags ? raw.Tags.value.value : [];
  // TODO CommandStats
}

// TODO Mobs & breedable mobs, tameable mobs, Projectiles, Items, XPOrbs, Vehicles, dynamic tiles, & other
