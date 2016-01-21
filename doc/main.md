# THIS PAGE IS UNDER DEVELOPMENT. PLEASE SEE <api.md> FOR DOCUMENTATION.

# `Schematic`
`Schematic` is the main class. To retrieve it, use:
```js
var Schematic = require('mc-schematic')(version);
```
where `version` is either `"1.8"` or `"1.9"`, and specifies a Minecraft version.

## Static functions

### `parse`(`data`: `Buffer`, `callback`: func(`err`: `Error`, schem: `Schematic`))

Reads data from a and passes any `Error` and a parsed `Schematic` to `callback`.
If `err` is `null`, schem will not be `null`.
If `err` is not `null`, schem will be `null`.

## Properties

### `raw` : `Object`

'`raw`' schematic object, returned directly from `prismarine-nbt`.

### `width` : number
Size along the x axis.
### `height` : number
Size along the y axis.
### `length` : number
Size along the z axis.

### `we`
Will be present if the schematic was exported with WorldEdit.
#### `offset` : `Vec3`
The offset of where the player was to the schematic when it was exported.
#### `origin` : `Vec3`
The original position of the schematic.

### `entities` : [Entity]
`Array` of entities in the schematic.
See [Entity](entity.md).

<!--
#### schematic.blocks
A three-dimensional array used to store the parsed blocks. You should not modify
this; instead use the `.getBlock()` and `.setBlock()` methods.
-->

## Methods

### `getBlock`(`x, y, z`: number) : Block
### `getBlock`(pos : `Vec3`) : Block
Arguments can either be three numbers or one Vec3 instance.
Returns the block at the `x`, `y`, and `z` co-ordinates.
See [prismarine-block](https://github.com/PrismarineJS/prismarine-block).

<!--
### updateRaw() : Object

Updates the `raw` property of the schematic and returns it.
-->

### `setBlock`(x`, y, z, id, data`: number)
### `setBlock`(`pos`: `Vec3, id, data`: number)
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

### `forEachBlock`(`callback`: func(block: Block, pos: `Vec3`))

Loop through every block in the schematic, calling `callback` for each.
If `callback` returns `true`, it will stop looping. **MODIFYING `width`,
`height`, or `length` in the callback may have unexpected consequences...**
```js
pos.equals(block.position) === true // (unless you modified block.position...)
```

<!--
### \_setBlock(pos: Vec3, block: Block)
Used internally by `.setBlock()`. `block` is a
[prismarine-block](https://github.com/PrismarineJS/prismarine-block).
Calling this method with a non-prismarine-block
as `block` may have unexpected consequences. **THE `position` PROPERTY OF
THE BLOCK WILL REMAIN AS YOU PASS IT, UNLIKE WITH `.setBlock()`, WHICH WILL
CLONE AND UPDATE THE POSITION. THIS WILL NOT UPDATE THE `length`, `width`, or
`height` PROPERTIES OF THE SCHEMATIC, EITHER.**
-->
