# schematic

Read Minecraft MCEdit/WorldEdit schematics.

```js
var Schematic = require('schematic')('1.8');

Schematic.readFile('doo.schematic', function (err, data) {
  if (err) throw err;
  console.log(data.blockAt(0, 0, 0));
});
```

### [Documentation](https://github.com/1b8/schematic/blob/master/doc/api.md)
### [Example](https://github.com/1b8/schematic/blob/master/doc/examples.js)
