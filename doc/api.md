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
    - [block.raw](#blockentityraw)
    - [Container](#container)
      - [block.customName](#blockentitycustomname)
      - [block.lockKey](#blockentitylockkey)
      - [block.items](#blockentityitems)
      - [block](#blockentity)
    - [Banner](#banner)
      - [block.background](#blockentitybackground)
      - [block.patterns](#blockentitypatterns)
    - [Beacon](#beacon)
      - [block.lockKey](#blockentitylockkey-1)
      - [block.levels](#blockentitylevels)
      - [block.powers](#blockentitypowers)
        - [block.powers.primary](#blockentitypowersprimary)
        - [block.powers.secondary](#blockentitypowerssecondary)
    - [Brewing stand](#brewing-stand)
      - [block.brewTime](#blockentitybrewtime)
      - [block.fuel](#blockentityfuel)
    - [Chest](#chest)
      - [block.lootTable](#blockentityloottable)
      - [block.lootTableSeed](#blockentityloottableseed)
    - [Redstone Comparator](#redstone-comparator)
      - [block.outputSignal](#blockentityoutputsignal)
    - [Command Block](#command-block)
      - [block.customName](#blockentitycustomname-1)
      - [block.lockKey](#blockentitylockkey-2)
      - [block.commandStats](#blockentitycommandstats)
      - [block.command](#blockentitycommand)
      - [block.successCount](#blockentitysuccesscount)
      - [block.trackOutput](#blockentitytrackoutput)
      - [block.powered](#blockentitypowered)
      - [block.auto](#blockentityauto)
    - [Dropper](#dropper)
    - [Enchantment Table](#enchantment-table)
      - [block.customName](#blockentitycustomname-2)
    - [End Gateway](#end-gateway)
      - [block.age](#blockentityage)
      - [block.exactTeleport](#blockentityexactteleport)
      - [block.exitPortal](#blockentityexitportal)
    - [Flower Pot](#flower-pot)
      - [block.flower](#blockentityflower)
    - [Furnace](#furnace)
      - [block.burnTimeLeft](#blockentityburntimeleft)
      - [block.cookTime](#blockentitycooktime)
      - [block.cookTimeTotal](#blockentitycooktimetotal)
    - [Hopper](#hopper)
      - [block.transferCooldown](#blockentitytransfercooldown)
    - [Note block](#note-block)
      - [block.note](#blockentitynote)
      - [block.powered](#blockentitypowered-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Note: functions are displayed in this format:
```
functionName(argName : Type | OtherType, functionArg : function(thing : string)[, otherArg : boolean])
```
where `functionName` is a function that takes 1 or 3 arguments, and:
- the first argument is called `argName` and is an instance of either `Type` or
`OtherType`
- the second argument is called `functionArg`, and is a function...
- the third argument is optional, called `otherArg`, and a boolean.

# Classes

## Schematic
`Schematic` is the main class. To retrieve it, call:
```js
var Schematic = require('mc-schematic')(version);
```
where `version` is either `"1.8"` or `"1.9"`, and specifies a Minecraft version.

### Static functions

#### Schematic.parse(data : Buffer, callback : function(error : Error | null, data : Schematic))
Read a `Buffer` and execute the callback with these args:
* `err` - Any error
* `data` - The parsed `Schematic` object

### Instance properties

#### schematic.raw
'raw' schematic object, returned directly from prismarine-nbt.

#### schematic.width
Size along the x axis.
<!-- Note: Modifying `width`, `height`, or `length` should, for all intents and
purposes, have the same effect as modifying the `length` property of an array. -->

#### schematic.height
Size along the y axis.

#### schematic.length
Size along the z axis.

#### schematic.we
Will be present if the schematic was exported with WorldEdit.
#### schematic.we.offset
Vec3. The offset of where the player was to the schematic when it was exported.
#### schematic.we.origin
Vec3. The original position of the schematic.

#### schematic.entities
`Array` of entities in the schematic.
See [Entity](#entity).

<!--
#### schematic.blocks
A three-dimensional array used to store the parsed blocks. You should not modify
this; instead use the `.getBlock()` and `.setBlock()` methods.
-->

### Methods

#### schematic.getBlock(pos : Vec3)
#### schematic.getBlock(x, y, z : number)
Arguments can either be three numbers or one Vec3 instance.
Returns the block at the `x`, `y`, and `z` co-ordinates.
See [prismarine-block](https://github.com/PrismarineJS/prismarine-block).

#### schematic.setBlock(pos : Vec3, id, data=0 : number)
#### schematic.setBlock(x, y, z, id, data=0 : number)
Set the block at (`x`, `y`, `z`) or `pos`. **This does not modify the file!**
- `id` - block id (1 for stone, etc.)
- `data` - data value, defaults to `0`.
This also updates the `width`, `length`, and `height` properties of the schematic.

Example usage to set the block at (`5`, `5`, `5`) to red wool
(wool is id `35`, red is data value `14`):
```js
var v = require('vec3'); // https://npmjs.com/package/vec3
schematic.setBlock(v(5, 5, 5), 35, 14);
// OR
schematic.setBlock(5, 5, 5, 35, 14);
```

<!--
#### schematic.\_setBlock(pos : Vec3, block : Block)
Used internally by `.setBlock()`. `block` is a
[prismarine-block](https://github.com/PrismarineJS/prismarine-block).
Calling this method with a non-prismarine-block
as `block` may have unexpected consequences. **THE `position` PROPERTY OF
THE BLOCK WILL REMAIN AS YOU PASS IT, UNLIKE WITH `.setBlock()`, WHICH WILL
CLONE AND UPDATE THE POSITION. THIS WILL NOT UPDATE THE `length`, `width`, or
`height` PROPERTIES OF THE SCHEMATIC, EITHER.**
-->

#### schematic.forEachBlock(callback : function(block : Block, pos : Vec3))
Loop through every block in the schematic, calling `callback` for each.
If `callback` returns `true`, it will stop looping. **MODIFYING `width`,
`height`, or `length` in the callback may have unexpected consequences...**
```js
pos.equals(block.position) === true // (unless you modified block.position...)
```

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

### block.raw
### block.blockEntityType
You can check if this exists to check if `block` is a block entity or not.

### Container

#### block.customName
Custom name of this container. May not exist, or may exist and be empty.

#### block.lockKey
If set, a player must hold an item with this string as its name to open the container.

#### block.items
`Array` of [prismarine-item](https://github.com/prismarinejs/prismarine-item)s,
EXCEPT `item.nbt` is an `Object` instead of a `Buffer`.

### Banner

#### block.background
#### block.patterns
Looks like:
```json
{
  "color": 4,
  "pattern": "Border"
}
```

### Beacon

#### block.lockKey
#### block.levels
Number of pyramid levels.

#### block.powers
##### block.powers.primary
##### block.powers.secondary

### Brewing stand
Container.
#### block.brewTime
#### block.fuel
Added in 1.9.

### Chest
Container.
#### block.lootTable
Added in 1.9.
#### block.lootTableSeed
Added in 1.9.

### Redstone Comparator
#### block.outputSignal

### Command Block
#### block.customName
#### block.lockKey
#### block.commandStats
See [`entity.commandStats`](#entitycommandstats)
#### block.command
The command the block will execute.
#### block.successCount
#### block.trackOutput
Boolean.
#### block.powered
Added in 1.9.
#### block.auto
Added in 1.9.

### Dropper
Container.

### Enchantment Table
#### block.customName

### End Gateway
Added in 1.9.
#### block.age
#### block.exactTeleport
Boolean.
#### block.exitPortal
Vec3.

### Flower Pot
#### block.flower
Block.

### Furnace
Container.
#### block.burnTimeLeft
In ticks.
#### block.cookTime
Time it's been cooking for, in ticks.
#### block.cookTimeTotal
Time it will take to cook, in ticks.

### Hopper
Container.
#### block.transferCooldown

### Note block
#### block.note
Pitch, integer.
#### block.powered
Added in 1.9.

TODO: More block entity types.
