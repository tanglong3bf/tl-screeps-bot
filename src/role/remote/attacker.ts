export const roleRemoteAttacker = (roomName: string) => ({
  prepare: (creep:Creep) => {
    creep.moveTo(new RoomPosition(25, 25, roomName));
  },
  isReady: (creep: Creep) => {
    return creep.room.name == roomName && creep.pos.x != 0 && creep.pos.x != 49 && creep.pos.y != 0 && creep.pos.y != 49;
  },
  target: function(creep: Creep) {
    const result: Structure[] = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_INVADER_CORE}});
    if (result.length > 0) {
      const ret = creep.dismantle(result[0]);
      console.log("attacker", ret);
      if (creep.dismantle(result[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(result[0]);
      }
    } else {
      creep.memory.continue = false;
      creep.suicide();
    }
  }
});
