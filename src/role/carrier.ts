export const roleCarrier = () => ({
  source: (creep: Creep) => {

    const tombstones = creep.room.find(FIND_TOMBSTONES, {filter: (tombstone) => {
      return tombstone.creep.my && tombstone.creep.name.startsWith('carrier');
    }});

    if (tombstones && tombstones.length > 1 && tombstones[0].store.getUsedCapacity() > 0) {
      const key: any = Object.keys(tombstones[0].store);
      if (creep.withdraw(tombstones[0], key) == ERR_NOT_IN_RANGE) {
        creep.moveTo(tombstones[0]);
        return false;
      }
      return true;
    }


    if (!creep.room.haveTask()) return;
    var task = creep.room.getFirstTask();

    var from: Id<Structure>;
    switch (task.type) {
      case 'fillExtension':
        case 'fillTower':
        case 'labIn':
        case 'fillNuker':
        from = creep.room.storage.id;
      break;
      case 'labOut':
        from = task.from;
      break;
    }

    var resource: any;
    switch (task.type) {
      case 'fillExtension':
        case 'fillTower':
        resource = RESOURCE_ENERGY;
      break;
      case 'labIn':
        case 'fillNuker':
        case 'labOut':
        resource = task.sourceType;
      break;
    }

    if (task.type != 'fillExtension') {
      var amount = creep.store.getFreeCapacity() < task.count ? creep.store.getFreeCapacity() : task.count;
    } else {
      const needEnergy = creep.room.energyCapacityAvailable - creep.room.energyAvailable;
      var amount = creep.store.getFreeCapacity() < needEnergy ? creep.store.getFreeCapacity() : needEnergy;
    console.log(creep.room.name, from, resource, amount);
    }
    const ret = creep.withdraw(Game.getObjectById(from), resource, amount);
    console.log('ret: ', ret);
    if (ret == ERR_NOT_IN_RANGE) {
      creep.moveTo(Game.getObjectById(from));
    } else if (ret == OK) {
      return true;
    }

    return creep.store.getFreeCapacity() == 0 || creep.store.getUsedCapacity() == amount;
  },

  target: (creep: Creep) => {
    if (creep.room.haveTask() && creep.room.getFirstTask().type == 'fillExtension') creep.room.completeFirstTask(0);
    const usedCapacity: number = creep.store.getUsedCapacity();
    console.log(usedCapacity);

    var task = creep.room.getFirstTask();
    if (task == undefined) return true;

    if (task.type != 'fillExtension') {
      var targetId: Id<Structure>;
      switch (task.type) {
        case 'fillTower':
          case 'labIn':
          targetId = task.to;
        break;
        case 'fillNuker':
          targetId = creep.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_NUKER}})[0].id;
        case 'labOut':
          targetId = creep.room.storage.id;
        break;
      }

      var resource: any;
      switch (task.type) {
        case 'fillTower':
          resource = RESOURCE_ENERGY;
        break;
        case 'labIn':
          case 'fillNuker':
          case 'labOut':
          resource = task.sourceType;
        break;
      }
      const ret = creep.transfer(Game.getObjectById(targetId), resource);
      console.log(ret);
      if (ret == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.getObjectById(targetId));
      } else if (ret == OK) {
        creep.room.completeFirstTask(usedCapacity);
      }
    }
    else {

      var targetList: any[] = creep.room.find(FIND_MY_STRUCTURES, {filter: (ex: any) => {
        return ex.structureType == STRUCTURE_EXTENSION && ex.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      }});
      creep.room.find(FIND_MY_SPAWNS, {filter: (spawn: any) => {
        return spawn.structureType == STRUCTURE_SPAWN && spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      }}).forEach(spawn => { targetList.push(spawn); });
      targetList.sort((a, b) => {
        return a.pos.getRangeTo(creep) - b.pos.getRangeTo(creep);
      });

      const ret = creep.transfer(targetList[0], RESOURCE_ENERGY);
      if (ret == ERR_NOT_IN_RANGE) {
        creep.moveTo(targetList[0]);
      } else if (ret == OK) {
        creep.room.completeFirstTask(usedCapacity);
      }
    }
    return creep.store.getUsedCapacity() == 0;
  }
})
