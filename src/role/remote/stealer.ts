export const roleStealer = () => ({
  source: (creep: Creep) => {
    const storage = Game.rooms['W37N4'].storage;
    const key = RESOURCE_ZYNTHIUM;
    if (creep.withdraw(storage, key) == ERR_NOT_IN_RANGE) {
      creep.moveTo(storage, {visualizePathStyle: {lineStyle: 'dashed'}});
    }
    return creep.store.getFreeCapacity() == 0;
  },
  target: (creep: Creep) => {
    const storage = Game.rooms['W38N4'].storage;
    const key: any = Object.keys(creep.store)[0];
    if (creep.transfer(storage, key) == ERR_NOT_IN_RANGE) {
      creep.moveTo(storage);
    }
    return creep.store.getUsedCapacity() == 0;
  }
});
