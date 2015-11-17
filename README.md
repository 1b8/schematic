# schematic

Read Minecraft MCEdit/WorldEdit schematics.

```js
var Schematic = require('schematic')('1.8');

Schematic.readFile('doo.schematic', function (err, data) {
  if (err) throw err;
  console.log(data.blockAt(0, 0, 0));
});
```

### [Documentation](doc/api.md)
### [Example](doc/examples.js)
