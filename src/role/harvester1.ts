/**
 * 挖运分离的采集爬，自动建造container
 */
export const roleHarvester1 = (sourceId: Id<Source>) => ({
  prepare: (creep: Creep) => {
    const container = creep.room.getSourceContainer(sourceId);
    if (container) {
      creep.moveTo(container);
    } else {
      creep.moveTo(Game.getObjectById(sourceId));
    }
  },
  isReady: (creep: Creep) => {
    const container = creep.room.getSourceContainer(sourceId);
    if (container) {
      return creep.pos.isEqualTo(container);
    } else {
      return creep.pos.isNearTo(Game.getObjectById(sourceId));
    }
  },
  source: (creep: Creep) => {
    creep.harvest(Game.getObjectById(sourceId));
    return creep.store.getFreeCapacity() == 0;
  },
  target: (creep: Creep) => {
    const container = creep.room.getSourceContainer(sourceId);
    if (container) {
      if (container.hits < container.hitsMax) {
        creep.repair(container);
      } else {
        const count = container.store.getFreeCapacity() < creep.store.energy ? container.store.getFreeCapacity() : creep.store.energy;
        if (count) creep.drop(RESOURCE_ENERGY, count);
      }
    } else {
      const look = creep.room.lookAt(creep);
      let haveConstructionSite = false;
      look.some((lookObject) => {
        if(lookObject.type == LOOK_CONSTRUCTION_SITES) {
          creep.build(lookObject[LOOK_CONSTRUCTION_SITES]);
          haveConstructionSite = true;
          return true;
        }
        return false;
      });
      if (!haveConstructionSite) {
        creep.room.createConstructionSite(creep, STRUCTURE_CONTAINER);
      }
    }
    return creep.store.getUsedCapacity() == 0;
  }
});
