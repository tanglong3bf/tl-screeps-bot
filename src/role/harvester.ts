export const roleHarvester = (containerId: Id<StructureContainer>) => ({
  prepare: (creep: Creep) => {
    const container = Game.getObjectById(containerId);
    creep.moveTo(container);
  },
  isReady: (creep: Creep) => {
    const container = Game.getObjectById(containerId);
    return container.pos.isEqualTo(creep);
  },
  source: (creep: Creep) => {
    const sources: Source[] = creep.room.find(FIND_SOURCES, {filter: (source: Source) => source.pos.isNearTo(creep) });
    const container = Game.getObjectById(containerId);
    if (container && container.store[RESOURCE_ENERGY] >= creep.store.getCapacity()) {
      creep.withdraw(container, RESOURCE_ENERGY);
      return true;
    }
    creep.harvest(sources[0]);
    return creep.store.getFreeCapacity() == 0;
  },
  target: (creep: Creep) => {
    const links: StructureLink[] = creep.room.find(FIND_MY_STRUCTURES, {filter: (structure: Structure) => {
      return structure.structureType == STRUCTURE_LINK && structure.pos.isNearTo(creep);
    }});
    if (creep.pos.x == 24) console.log(links);
    creep.transfer(links[0], RESOURCE_ENERGY);
    if (links[0].store[RESOURCE_ENERGY] == 800) {
      const centerLink: StructureLink[] = creep.room.find(FIND_MY_STRUCTURES, {filter: (link: Structure) => {
        if (link.structureType != STRUCTURE_LINK) return false;
        const flags = creep.room.find(FIND_FLAGS, {filter: (flag) => {
          return flag.name == creep.room.name + 'center';
        }});
        if (flags.length == 0) {
          throw new Error(`${creep.room.name}缺少中央旗帜`);
        }
        return link.pos.isNearTo(flags[0]);
      }});
      links[0].transferEnergy(centerLink[0]);
    }
    return creep.store.getUsedCapacity() == 0;
  }
});
