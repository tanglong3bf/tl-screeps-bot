/**
 * 最简单的采集者，自采自运，不用container和link
 * 尺寸尽量控制在1-4W
 */
export const roleHarvester1 = (sourceId: Id<Source>) => ({
  source: (creep: Creep) => {
    creep.harvestSource(sourceId);
    return creep.store.getFreeCapacity() == 0;
  },
  target: (creep: Creep) => {
    // ex
    var targets: Structure[] = creep.room.find(FIND_STRUCTURES, {
        filter: (structure: AnyStructure) => {
            return structure.structureType == STRUCTURE_EXTENSION &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    if(targets.length > 0) {
        // 按照距离排序，距离相同，按照ex中剩余能量排序
        targets.sort((a: StructureExtension, b: StructureExtension) => {
            let range = creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
            if (range) return range;
            return b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY];
        })
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
        return creep.store.getUsedCapacity() == 0;
    }

    // spawn
    let my_spawn: StructureSpawn = creep.room.find(FIND_MY_SPAWNS)[0];
    if (my_spawn.store[RESOURCE_ENERGY] != 300) {
        if (creep.transfer(my_spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(my_spawn);
        }
        return creep.store.getUsedCapacity() == 0;
    }

    // tower
    let my_tower_list: StructureTower[] = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure: AnyStructure) =>
                structure.structureType == STRUCTURE_TOWER &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    });
    if (my_tower_list.length > 0) {
        // 按照能量排序
        my_tower_list.sort((a, b) => {
            return b.store.getFreeCapacity(RESOURCE_ENERGY) - a.store.getFreeCapacity(RESOURCE_ENERGY);
        })
        if (creep.transfer(my_tower_list[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(my_tower_list[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    return creep.store.getUsedCapacity() == 0;
  }
});
