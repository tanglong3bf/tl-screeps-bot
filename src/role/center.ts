export const roleCenter = (centerPos?: RoomPosition) => ({
  prepare: (creep: Creep) => {
    const flag = creep.room.find(FIND_FLAGS, {filter: (flag) => {
      return flag.name == creep.room.name + 'center';
    }});
    if (flag.length == 0) return;
    creep.moveTo(flag[0]);
  },
  isReady: (creep: Creep) => {
    const flag = creep.room.find(FIND_FLAGS, {filter: (flag) => {
      return flag.name == creep.room.name + 'center';
    }});
    if (flag.length == 0) return false;
    return creep.pos.isEqualTo(flag[0]);
  },
  target: (creep: Creep) => {
    let links: StructureLink[] = creep.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
    let storage = creep.room.storage;
    let terminal = creep.room.terminal;
    let near_link = links.filter(link => creep.pos.isNearTo(link));
    let link = near_link[0];

    if (creep.store.energy > 0) {
      creep.transfer(storage, RESOURCE_ENERGY);
    } else if (creep.store[RESOURCE_ZYNTHIUM] > 0) {
      creep.transfer(storage, RESOURCE_ZYNTHIUM);
    } else if (creep.store[RESOURCE_ZYNTHIUM_KEANITE] > 0) {
      creep.transfer(storage, RESOURCE_ZYNTHIUM_KEANITE);
    } else if (link.store[RESOURCE_ENERGY] > 0) {
      creep.withdraw(link, RESOURCE_ENERGY);
    } else if (terminal.store[RESOURCE_ZYNTHIUM] > 0) {
      creep.withdraw(terminal, RESOURCE_ZYNTHIUM);
    }
  }
})
