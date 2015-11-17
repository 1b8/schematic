// Example

var Schematic = require('schematic')('1.8');

Schematic.readFile('../test/test1.schematic', function (err, data) {
  if (err) throw err;

  // Entities
  console.log(data.entities);

  // Getting blocks
  console.log(data.blockAt(0, 0, 0));

  // TODO more stuff
});
