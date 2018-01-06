<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Classes](#classes)
  - [Schematic](#schematic)
    - [Static functions](#static-functions)
      - [Schematic.parse(data, callback)](#schematicparsedata-callback)
    - [Instance properties](#instance-properties)
      - [schematic.raw](#schematicraw)
      - [schematic.width](#schematicwidth)
      - [schematic.height](#schematicheight)
      - [schematic.length](#schematiclength)
      - [schematic.entities](#schematicentities)
      - [schematic.blockEntities](#schematicblockentities)
    - [Methods](#methods)
      - [schematic.getBlock(x, y, z)](#schematicgetblockx-y-z)
  - [Entity](#entity)
    - [entity.dimension](#entitydimension)
    - [entity.raw](#entityraw)
    - [entity.id](#entityid)
    - [entity.position](#entityposition)
    - [entity.velocity](#entityvelocity)
    - [entity.yaw](#entityyaw)
    - [entity.pitch](#entitypitch)
    - [entity.fallDistance](#entityfalldistance)
    - [entity.fireTicks](#entityfireticks)
    - [entity.air](#entityair)
    - [entity.onGround](#entityonground)
    - [entity.invulnerable](#entityinvulnerable)
    - [entity.portalCooldown](#entityportalcooldown)
    - [entity.uuid](#entityuuid)
    - [entity.customName](#entitycustomname)
    - [entity.customNameVisible](#entitycustomnamevisible)
    - [entity.silent](#entitysilent)
    - [entity.rider](#entityrider)
    - [entity.glowing](#entityglowing)
    - [entity.nbt](#entitynbt)
    - [entity.commandStats](#entitycommandstats)
      - [entity.commandStats.successCountObjective](#entitycommandstatssuccesscountobjective)
      - [entity.commandStats.successCountName](#entitycommandstatssuccesscountname)
      - [entity.commandStats.affectedBlocksObjective](#entitycommandstatsaffectedblocksobjective)
      - [entity.commandStats.affectedBlocksName](#entitycommandstatsaffectedblocksname)
      - [entity.commandStats.affectedEntitiesObjective](#entitycommandstatsaffectedentitiesobjective)
      - [entity.commandStats.affectedEntitiesName](#entitycommandstatsaffectedentitiesname)
      - [entity.commandStats.affectedItemsObjective](#entitycommandstatsaffecteditemsobjective)
      - [entity.commandStats.affectedItemsName](#entitycommandstatsaffecteditemsname)
      - [entity.commandStats.queryResultObjective](#entitycommandstatsqueryresultobjective)
      - [entity.commandStats.queryResultName](#entitycommandstatsqueryresultname)
  - [BlockEntity](#blockentity)
    - [blockEntity.raw](#blockentityraw)
    - [Container](#container)
      - [blockEntity.customName](#blockentitycustomname)
      - [blockEntity.lockKey](#blockentitylockkey)
      - [blockEntity.items](#blockentityitems)
      - [blockEntity](#blockentity)
    - [Banner](#banner)
      - [blockEntity.background](#blockentitybackground)
      - [blockEntity.patterns](#blockentitypatterns)
    - [Beacon](#beacon)
      - [blockEntity.lockKey](#blockentitylockkey-1)
      - [blockEntity.levels](#blockentitylevels)
      - [blockEntity.powers](#blockentitypowers)
        - [blockEntity.powers.primary](#blockentitypowersprimary)
        - [blockEntity.powers.secondary](#blockentitypowerssecondary)
    - [Brewing stand](#brewing-stand)
      - [blockEntity.brewTime](#blockentitybrewtime)
      - [blockEntity.fuel](#blockentityfuel)
    - [Chest](#chest)
      - [blockEntity.lootTable](#blockentityloottable)
      - [blockEntity.lootTableSeed](#blockentityloottableseed)
    - [Redstone Comparator](#redstone-comparator)
      - [blockEntity.outputSignal](#blockentityoutputsignal)
    - [Command Block](#command-block)
      - [blockEntity.customName](#blockentitycustomname-1)
      - [blockEntity.lockKey](#blockentitylockkey-2)
      - [blockEntity.commandStats](#blockentitycommandstats)
      - [blockEntity.command](#blockentitycommand)
      - [blockEntity.successCount](#blockentitysuccesscount)
      - [blockEntity.trackOutput](#blockentitytrackoutput)
      - [blockEntity.powered](#blockentitypowered)
      - [blockEntity.auto](#blockentityauto)
    - [Dropper](#dropper)
    - [Enchantment Table](#enchantment-table)
      - [blockEntity.customName](#blockentitycustomname-2)
    - [End Gateway](#end-gateway)
      - [blockEntity.age](#blockentityage)
      - [blockEntity.exactTeleport](#blockentityexactteleport)
      - [blockEntity.exitPortal](#blockentityexitportal)
    - [Flower Pot](#flower-pot)
      - [blockEntity.flower](#blockentityflower)
    - [Furnace](#furnace)
      - [blockEntity.burnTimeLeft](#blockentityburntimeleft)
      - [blockEntity.cookTime](#blockentitycooktime)
      - [blockEntity.cookTimeTotal](#blockentitycooktimetotal)
    - [Hopper](#hopper)
      - [blockEntity.transferCooldown](#blockentitytransfercooldown)
    - [Note block](#note-block)
      - [blockEntity.note](#blockentitynote)
      - [blockEntity.powered](#blockentitypowered-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Classes

## Schematic
`Schematic` is the main class; `require('schematic')(version)` returns this.

### Static functions

#### Schematic.parse(data, callback)
Read a `Buffer` and execute the callback with these args:
* `err` - Any error
* `data` - The parsed `Schematic` object

### Instance properties

#### schematic.raw
'raw' schematic object, returned from prismarine-nbt`.simplify()`.

#### schematic.width
Size along the x axis.

#### schematic.height
Size along the y axis.

#### schematic.length
Size along the z axis.

#### schematic.entities
`Array` of entities in the schematic.
See [Entity](#entity).

#### schematic.blockEntities
`Array` of block entities in the schematic (not intended for direct use;
`schematic.blockAt()` will return a block entity if there is a block entity at
the specified position).
See [BlockEntity](#blockentity).

### Methods

#### schematic.getBlock(x, y, z)
Arguments can either be three numbers or one Vec3 instance.
Returns the block at the `x`, `y`, and `z` co-ordinates.
See [prismarine-block](https://github.com/PrismarineJS/prismarine-block).

## Entity

### entity.dimension
`"nether"`, `"overworld"`, or `"end"`.

### entity.raw
Raw data

### entity.id
The name of the entity, such as `"Zombie"`, or `"EntityHorse"`.

### entity.position
[`Vec3`](https://github.com/andrewrk/node-vec3), the position of the entity.

### entity.velocity
[`Vec3`](https://github.com/andrewrk/node-vec3), the speed at which the entity
is moving, in blocks per tick.

### entity.yaw

### entity.pitch

### entity.fallDistance
The amount of distance the entity has fallen, or 0 if the entity is not falling.

### entity.fireTicks
The number of ticks until the entity stops being on fire.
If negative, how many ticks while standing in fire for the entity to start burning.

### entity.air
The number of ticks while underwater until the entity starts drowning.

### entity.onGround
Boolean.

### entity.invulnerable
Boolean.

### entity.portalCooldown
Number of ticks until the entity can be teleported through a portal.

### entity.uuid
The entity's UUID. Looks like:
```json
[
  [
    739277774,
    -1808448075
  ],
  [
    -1817433807,
    1980514233
  ]
]
```

### entity.customName
`CustomName` of the entity, or an empty string.

### entity.customNameVisible
Boolean.

### entity.silent
Boolean.

### entity.rider
1.9 only, another `Entity`.

### entity.glowing
(1.9 effects) Boolean.

### entity.nbt
Extra data about the entity.

### entity.commandStats
#### entity.commandStats.successCountObjective
#### entity.commandStats.successCountName
#### entity.commandStats.affectedBlocksObjective
#### entity.commandStats.affectedBlocksName
#### entity.commandStats.affectedEntitiesObjective
#### entity.commandStats.affectedEntitiesName
#### entity.commandStats.affectedItemsObjective
#### entity.commandStats.affectedItemsName
#### entity.commandStats.queryResultObjective
#### entity.commandStats.queryResultName

## BlockEntity

Inherits from [prismarine-block](https://github.com/prismarinejs/prismarine-block)

### blockEntity.raw

### Container

#### blockEntity.customName
Custom name of this container. May not exist, or may exist and be empty.

#### blockEntity.lockKey
If set, a player must hold an item with this string as its name to open the container.

#### blockEntity.items
`Array` of [prismarine-item](https://github.com/prismarinejs/prismarine-item)s,
EXCEPT `item.nbt` is an `Object` instead of a `Buffer`.

#### blockEntity

### Banner

#### blockEntity.background
#### blockEntity.patterns
Looks like:
```json
{
  "color": 4,
  "pattern": "Border"
}
```

### Beacon

#### blockEntity.lockKey
#### blockEntity.levels
Number of pyramid levels.

#### blockEntity.powers
##### blockEntity.powers.primary
##### blockEntity.powers.secondary

### Brewing stand
Container.
#### blockEntity.brewTime
#### blockEntity.fuel
Added in 1.9.

### Chest
Container.
#### blockEntity.lootTable
Added in 1.9.
#### blockEntity.lootTableSeed
Added in 1.9.

### Redstone Comparator
#### blockEntity.outputSignal

### Command Block
#### blockEntity.customName
#### blockEntity.lockKey
#### blockEntity.commandStats
See [`entity.commandStats`](#entitycommandstats)
#### blockEntity.command
The command the block will execute.
#### blockEntity.successCount
#### blockEntity.trackOutput
Boolean.
#### blockEntity.powered
Added in 1.9.
#### blockEntity.auto
Added in 1.9.

### Dropper
Container.

### Enchantment Table
#### blockEntity.customName

### End Gateway
Added in 1.9.
#### blockEntity.age
#### blockEntity.exactTeleport
Boolean.
#### blockEntity.exitPortal
Vec3.

### Flower Pot
#### blockEntity.flower
Block.

### Furnace
Container.
#### blockEntity.burnTimeLeft
In ticks.
#### blockEntity.cookTime
Time it's been cooking for, in ticks.
#### blockEntity.cookTimeTotal
Time it will take to cook, in ticks.

### Hopper
Container.
#### blockEntity.transferCooldown

### Note block
#### blockEntity.note
Pitch, integer.
#### blockEntity.powered
Added in 1.9.

TODO: More block entity types.
