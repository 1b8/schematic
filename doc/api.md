<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Schematic](#schematic)
  - [Static functions](#static-functions)
    - [Schematic.read(data, callback)](#schematicreaddata-callback)
    - [Schematic.readFile(path, callback)](#schematicreadfilepath-callback)
  - [Instance properties](#instance-properties)
    - [schematic.raw](#schematicraw)
    - [schematic.width](#schematicwidth)
    - [schematic.height](#schematicheight)
    - [schematic.length](#schematiclength)
    - [schematic.entities](#schematicentities)
    - [schematic.blockEntities](#schematicblockentities)
  - [Methods](#methods)
    - [schematic.blockAt(x, y, z)](#schematicblockatx-y-z)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Schematic
`Schematic` is the main class; `require('schematic')(version)` returns this.

## Static functions

### Schematic.read(data, callback)
Read a `Buffer` and execute the callback with these args:
* `err` - Any error
* `data` - The parsed `Schematic` object

### Schematic.readFile(path, callback)
Parse a file (`path` is absolute, or relative from the current working directory)
* `path` - The path to get the file from (absolute, or relative from [cwd](https://nodejs.org/api/process.html#process_process_cwd)).
* `callback` - See [`Schematic.read`](#schematicread)

## Instance properties

### schematic.raw
'raw' schematic object, returned directly from prismarine-nbt.

### schematic.width
Size along the x axis.

### schematic.height
Size along the y axis.

### schematic.length
Size along the z axis.

### schematic.entities
Array of entities in the schematic

### schematic.blockEntities
Array of block entities in the schematic (not intended for direct use);
`schematic.blockAt()` will return a block entity if there is a block entity at
the specified position.

## Methods

### schematic.blockAt(x, y, z)
Returns the block at the `x`, `y`, and `z` co-ordinates.
