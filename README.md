# schematic

[![NPM version](https://img.shields.io/npm/v/mc-schematic.svg)](http://npmjs.com/package/mc-schematic)

Read Minecraft MCEdit/WorldEdit schematics.

```js
var fs = require('fs');
var Schematic = require('mc-schematic')('1.8');

fs.readFile(__dirname + '/test/schems/test1.schematic', function (err, data) {
  Schematic.parse(data, function (err, schem) {
    console.log(schem.getBlock(0, 0, 0));
  });
});
```

If you have any problems, questions, or ideas, please
[file an issue](https://github.com/1b8/schematic/issues).

Contributions/bugfixes are welcome in the form of
[pull requests](https://github.com/1b8/schematic/pulls).

### Installation
```
npm install --save mc-schematic
```

### [Documentation](https://github.com/1b8/schematic/blob/master/doc/api.md)
### [Example](https://github.com/1b8/schematic/blob/master/doc/examples.js)

### TODO
* `entity.updateRaw()`
* more block entities
* different entity types (mob, breedable...)
* `schem.write()`
