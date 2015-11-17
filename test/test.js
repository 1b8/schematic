var fs = require('fs');
var Schematic = require('../')('1.8');

fs.readFile('test1.schematic', function (err, data) {
  if (err) throw err;

  Schematic.parse(data, function (err, schem) {
    if (err) throw err;

    l('Hello');
    l(schem.blockEntities[0]);
    // TODO tests
  });
});

function l() {console.log.apply(null, arguments);}
