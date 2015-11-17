# schematic

Read Minecraft MCEdit/WorldEdit schematics.

# Usage

```js
var Schematic = require('schematic')('1.8');

Schematic.readFile('doo.schematic', function (err, data) {
  if (err) throw err;
  console.log(data.blockAt(0, 0, 0));
});
```

# Documentation
TODO
<!--## Functions
### schematic`.read(path, callback)`

`path` - path to the schematic, either absolute, or relative from the main module of your program

`callback` - function to call after parsing schematic. Args:

  error - `Error` object, will be `null` if there is no error.

  schematic - `Schematic` object, will be `undefined` if there is an error.

## 'Classes'
### `Schematic`

The class of the second argument to the callback

#### Properties

`raw` - 'raw' schematic data

`width` - size of the schematic along the X co-ordinate

`height` - size along the Y co-ordinate

`length` - size along the Z co-ordinate

#### Methods

`blockAt(x, y, z)`

Get the block at the x, y, and z co-ordinates of the schematic.
Uses [prismarine-block](https://github.com/PrismarineJS/prismarine-block#api).
-->
