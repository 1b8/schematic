# THIS PAGE IS UNDER DEVELOPMENT. PLEASE SEE <api.md> FOR DOCUMENTATION.

# Entity

## raw : Object
Raw data

<!--### entity.id
The name of the entity, such as `"Zombie"`, or `"EntityHorse"`.-->

<!--### entity.velocity
[`Vec3`](https://github.com/andrewrk/node-vec3), the speed at which the entity
is moving, in blocks per tick.-->

## fallDistance : number
The amount of distance the entity has fallen, or 0 if the entity is not falling.

## fireTicks : number
The number of ticks until the entity stops being on fire.
If negative, how many ticks while standing in fire for the entity to start burning.

## air : number
The number of ticks while underwater until the entity starts drowning.

## invulnerable : bool

## portalCooldown : number
Number of ticks until the entity can be teleported through a portal.

## uuid : [[number]]
The entity's UUID. Looks like:
```json
[
  [
    739277774,
    -1808448075
  ],
  [
    -1817433807,
    1980514233
  ]
]
```

## customName : string
`CustomName` of the entity, or an empty string.

## customNameVisible : bool
## silent : bool

<!--
## rider : Entity
## glowing : bool
-->

## nbt : Object
Extra data about the entity.

## commandStats
### successCountObjective
### successCountName
### affectedBlocksObjective
### affectedBlocksName
### affectedEntitiesObjective
### affectedEntitiesName
### affectedItemsObjective
### affectedItemsName
### queryResultObjective
### queryResultName
