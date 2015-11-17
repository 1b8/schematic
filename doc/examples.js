// Example

var fs = require('fs');
var Schematic = require('schematic')('1.8');

fs.readFile('../test/test1.schematic', function (err, data) {
  if (err) throw err;

  Schematic.parse(data, function (err, schem) {
    if (err) throw err;

    // Entities
    console.log(data.entities);

    // Getting blocks
    console.log(data.blockAt(0, 0, 0));

    // TODO more stuff
  });
});
