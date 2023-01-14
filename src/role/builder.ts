export const roleBuilder = (source?: Id<Source | Structure>) => ({
  source: (creep: Creep) => {
    creep.getEnergy();
    // 自己身上的能量装满了，返回 true（切换至 target 阶段）
    return creep.store.getFreeCapacity() <= 0
  },
  target: (creep: Creep) => {
    // 建造指定目标
    let targets: ConstructionSite[] = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length > 0) {
      targets.sort((a, b) => {
        // 同种建筑优先建造距离近的
        if (a.structureType == b.structureType) {
          return creep.pos.getRangeTo(a.pos) - creep.pos.getRangeTo(b.pos);
        }
        // 优先建造road
        else if (a.structureType == STRUCTURE_ROAD) {
          return -1;
        }
        else if (b.structureType == STRUCTURE_ROAD) {
          return 1;
        }
        // container
        else if (a.structureType == STRUCTURE_CONTAINER) {
          return -1;
        }
        else if (b.structureType == STRUCTURE_CONTAINER) {
          return 1;
        }
        // ex
        else if (a.structureType == STRUCTURE_EXTENSION) {
          return -1;
        }
        else if (b.structureType == STRUCTURE_EXTENSION) {
          return 1;
        }
        // tower
        else if (a.structureType == STRUCTURE_TOWER) {
          return -1;
        }
        else if (b.structureType == STRUCTURE_TOWER) {
          return 1;
        }
      })
      if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
      }
    } else {
      creep.memory.continue = false;
    }
    return creep.store[RESOURCE_ENERGY] <= 0;
  }
});
