export const roleClaimer = (roomName: string) => ({
  prepare: (creep: Creep) => {
    if (creep.room.name != roomName) {
      creep.moveTo(new RoomPosition(25, 25, roomName));
    }
  },
  isReady: (creep: Creep) => {
    return creep.room.name == roomName;
  },
  target: (creep: Creep) => {
    if (creep.room.controller.my) {
      creep.memory.continue = false;
      creep.suicide();
    }
    if (creep.room.controller.reservation) {
      if (creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    } else if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller);
    }
  }
});
