# THIS PAGE IS UNDER DEVELOPMENT. PLEASE SEE <api.md> FOR DOCUMENTATION.

# Block

[prismarine-block](https://github.com/PrismarineJS/prismarine-block)

# BlockEntity

## All

### `raw` : `Object`

### `blockEntityType` : string
You can check if this exists to check if `block` is a block entity or not.

<!--
### updateRaw() : Object
-->

## Container

### `customName` : string
Custom name of this container. May not exist, or may exist and be empty.

### `lockKey`
If set, a player must hold an item with this string as its name to open the container.

### `items` : [`Item`]
`Array` of [prismarine-item](https://github.com/prismarinejs/prismarine-item)s.

## `Banner`

### `background` : number

### `patterns` : [`Object`]
Looks like:
```json
{
  "color": 16777215,
  "pattern": "Border"
}
```

## `Beacon`

### `lockKey`
### `levels` : number
Number of pyramid levels.
### `powers`
#### `primary` : number
#### `secondary` : number

## BrewingStand

### `brewTime` : number
<!--### `fuel`-->

## `Chest`

<!--
### lootTable
### lootTableSeed
-->

## Redstone`Comparator`

### `outputSignal`

## CommandBlock

### `customName` : string

### `lockKey`
See [`entity.commandStats`](entity.md#commandstats)

### `command` : string
The command the block will execute.

### `successCount` : number
### `trackOutput` : bool
<!--
### `powered` : bool
### `auto` : bool
-->

## `Dropper`

## `EnchantTable`

### `customName` : string

## `EndGateway`

### `age` : number
### `exactTeleport` : bool
### `exitPortal` : `Vec3`

## `FlowerPot`

<!--### flower : Block-->

## `Furnace`

### `burnTimeLeft` : number
In ticks.
### `cookTime` : number
Time it's been cooking for, in ticks.
### `cookTimeTotal` : number
Time it will take to cook, in ticks.

## `Hopper`

### `transferCooldown` : number

## TODO `MobSpawner`

## NoteBlock

### `note` : number
Pitch.
<!--
### `powered` : bool
-->

## TODO `Piston`

## TODO MORE
