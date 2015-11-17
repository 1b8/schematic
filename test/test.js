var Schematic = require('../');

Schematic.readFile('test1.schematic', (err, data) => {
  l('Hello');
  l(data);
  // TODO tests
});

function l() {
  console.log.apply(null, arguments);
}
