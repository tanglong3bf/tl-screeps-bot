export const roleRemoteUpgrader = () => ({
  prepare: (creep: Creep) => {
    creep.moveTo(new RoomPosition(25, 25, 'W32N3'));
  },
  isReady: (creep: Creep) => {
      return creep.room.name == 'W32N3' && creep.pos.x != 0;
  },
  source: (creep: Creep) => {
    const sources: Source[] = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[1]);
    }
    return creep.store.getFreeCapacity() == 0;
  },
  target: (creep: Creep) => {
      const controller = creep.room.controller
      if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller)
      }
    return creep.store.getUsedCapacity() == 0;
  }
})
