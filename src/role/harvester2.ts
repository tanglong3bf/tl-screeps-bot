export const roleHarvester2 = (sourceId: Id<Source>, linkId: Id<StructureLink>) => ({
  prepare: (creep: Creep) => {
    creep.moveTo(Game.getObjectById(sourceId));
  },
  isReady: (creep: Creep) => {
    return creep.pos.isNearTo(Game.getObjectById(sourceId));
  },
  source: (creep: Creep) => {
    const link = Game.getObjectById(linkId);
    console.log('roleHarvester2.source:', link.pos);
    console.log('roleHarvester2.source:', link.store.getFreeCapacity(RESOURCE_ENERGY));
    if (link.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
      console.log('roleHarvester2.source:', '123');
      const centerFlag = Game.flags[creep.room.name+'center'];
      const centerLink: StructureLink[] = creep.room.find(FIND_MY_STRUCTURES, {filter: (structure) => {
        return structure.structureType == STRUCTURE_LINK && structure.pos.isNearTo(centerFlag);
      }});
      link.transferEnergy(centerLink[0]);
    }
    if (creep.harvest(Game.getObjectById(sourceId)) == ERR_NOT_IN_RANGE) {
      creep.moveTo(Game.getObjectById(sourceId));
    }
    return creep.store.getFreeCapacity() == 0;
  },
  target: (creep: Creep) => {
    const link = Game.getObjectById(linkId);
    console.log('roleHarvester2.target:', link.pos);
    console.log('roleHarvester2.target:', link.store.getFreeCapacity(RESOURCE_ENERGY));
    if (link.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
      console.log('roleHarvester2.target:', '123');
      const centerFlag = Game.flags[creep.room.name+'center'];
      const centerLink: StructureLink[] = creep.room.find(FIND_MY_STRUCTURES, {filter: (structure) => {
        return structure.structureType == STRUCTURE_LINK && structure.pos.isNearTo(centerFlag);
      }});
      link.transferEnergy(centerLink[0]);
    }
    if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(link);
    }
    return creep.store.getUsedCapacity() == 0;
  }
});
