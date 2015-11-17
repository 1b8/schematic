var fs = require('fs');
var Schematic = require('../')('1.8');

fs.readFile('test1.schematic', function (err, data) {
  if (err) throw err;

  Schematic.parse(data, function (err, schem) {
    if (err) throw err;

    l('Hello');
    l(schem.blockAt(0,0,0).digTime(42));
    // TODO tests
  });
});

function l() {console.log.apply(null, arguments);}
