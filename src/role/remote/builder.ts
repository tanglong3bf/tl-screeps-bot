export const roleRemoteBuilder = () => ({
  prepare: (creep: Creep) => {
    if (creep.room.name != 'W37N4') {
      creep.moveTo(new RoomPosition(25, 25, 'W37N4'));
    }
    else {
      creep.move(RIGHT);
    }
  },
  isReady: (creep: Creep) => {
      return creep.room.name == 'W37N4' && creep.pos.x > 0;
  },
  source: (creep: Creep) => {
    const sources: Source[] = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0]);
    }
    return creep.store.getFreeCapacity() == 0;
  },
  target: (creep: Creep) => {
    let targets: ConstructionSite[] = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0]);
    }
    return creep.store.getUsedCapacity() == 0;
  }
})
