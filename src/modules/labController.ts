import {labReactant} from "@/config/labConstants";

function uuid() {
    var result = '';
    var hexcodes = "0123456789abcdef".split("");

    for (var index = 0; index < 32; index++) {
        var value = Math.floor(Math.random() * 16);

        switch (index) {
        case 8:
            result += '-';
            break;
        case 12:
            value = 4;
            result += '-';
            break;
        case 16:
            value = value & 3 | 8;
            result += '-';
            break;
        case 20:
            result += '-';
            break;
        }
        result += hexcodes[value];
    }
    return result;
};

export const creatLabController = (roomName: string) => {
  const getSource1 = () => {
    const flag: Flag[] = Game.rooms[roomName].find(FIND_FLAGS, {filter: (object) => {
      return (object instanceof Flag && object.name == 's1');
    }});
    if (flag.length == 0) return null;
    const result: StructureLab[] = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: (object) => {
      return object instanceof StructureLab && object.pos.isEqualTo(flag[0].pos);
    }});
    return result.length > 0 ? result[0] : null;
  };
  const getSource2 = () => {
    const flag: Flag[] = Game.rooms[roomName].find(FIND_FLAGS, {filter: (object) => {
      return (object instanceof Flag && object.name == 's2');
    }});
    if (flag.length == 0) return null;
    const result: StructureLab[] = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: (object) => {
      return object instanceof StructureLab && object.pos.isEqualTo(flag[0].pos);
    }});
    return result.length > 0 ? result[0] : null;
  };
  const getOthers = () => {
    const result: StructureLab[] = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: (object) => {
      if (!(object instanceof StructureLab)) return false;
      const s1 = getSource1();
      if (s1 instanceof StructureLab && object.pos.isEqualTo(s1)) return false;
      const s2 = getSource2();
      if (s2 instanceof StructureLab && object.pos.isEqualTo(s2)) return false;
      return true;
    }});
    return result;
  }

  const setLabTask = (taskType: string) => {
    Game.rooms[roomName].memory.labTask = taskType;
  };


  const emptyAllLab = () => {
    const labs: StructureLab[] = Game.rooms[roomName].find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LAB}});
    console.log('abcdefghijklmn');
    console.log(labs.length);
    labs.forEach((lab) => {
      const keys: any[] = Object.keys(lab.store)
      keys.forEach(resource => {
        if (resource != 'energy') {
          if (!Game.rooms[roomName].memory.publishedTask[lab.id] || Game.rooms[roomName].memory.publishedTask[lab.id].length == 0) {
            const count = lab.store.getUsedCapacity(resource);
            const id = uuid();
            Game.rooms[roomName].addTransferTask({
              id: id,
              type: 'labOut',
              sourceType: resource,
              count: count,
              from: lab.id
            });
            Game.rooms[roomName].memory.publishedTask[lab.id] = [];
            Game.rooms[roomName].memory.publishedTask[lab.id].push(id);
          }
        }
      });
    });
    Game.rooms[roomName].memory.labStatus = 'nothing';
  }

  const work = () => {
    const s1Lab: StructureLab = getSource1();
    const s2Lab: StructureLab = getSource2();
    const reactLabs: StructureLab[] = getOthers();
    const labTask = Game.rooms[roomName].memory.labTask;
    const s1 = labReactant[labTask][0];
    const s2 = labReactant[labTask][1]

    if (s1Lab.store.getUsedCapacity(s1) < 1000) {
      if (!Game.rooms[roomName].memory.publishedTask[s1Lab.id] || Game.rooms[roomName].memory.publishedTask[s1Lab.id].length == 0) {
        let kucun = s1Lab.room.storage.store.getUsedCapacity(s1);
        if (kucun > 0) {
          kucun = kucun < 1000 ? kucun : 1000;
          const id = uuid();
          Game.rooms[roomName].addTransferTask({
            id: id,
            type: 'labIn',
            sourceType: s1,
            count: kucun,
            to: s1Lab.id
          });
          Game.rooms[roomName].memory.publishedTask[s1Lab.id] = [];
          Game.rooms[roomName].memory.publishedTask[s1Lab.id].push(id);
        }
      }
    }
    if (s2Lab.store.getUsedCapacity(s2) < 1000) {
      if (!Game.rooms[roomName].memory.publishedTask[s2Lab.id] || Game.rooms[roomName].memory.publishedTask[s2Lab.id].length == 0) {
        let kucun = s2Lab.room.storage.store.getUsedCapacity(s2);
        if (kucun > 0) {
          kucun = kucun < 1000 ? kucun : 1000;
          const id = uuid();
          Game.rooms[roomName].addTransferTask({
            id: id,
            type: 'labIn',
            sourceType: s2,
            count: kucun,
            to: s2Lab.id
          });
          Game.rooms[roomName].memory.publishedTask[s2Lab.id] = [];
          Game.rooms[roomName].memory.publishedTask[s2Lab.id].push(id);
        }
      }
    }
    reactLabs.forEach((lab) => {
      if (Game.time % 5 == 0) {
        if (lab.runReaction(s1Lab, s2Lab) == ERR_NOT_ENOUGH_RESOURCES) {
          console.log('原料不足，启动反应失败');
        }
      }
      if (lab.store[labTask] > 1000) {
        if (!Game.rooms[roomName].memory.publishedTask[lab.id] || Game.rooms[roomName].memory.publishedTask[lab.id].length == 0) {
          const id = uuid();
          Game.rooms[roomName].addTransferTask({
            id: id,
            type: 'labOut',
            sourceType: labTask,
            count: 1000,
            from: lab.id
          });
          Game.rooms[roomName].memory.publishedTask[lab.id] = [];
          Game.rooms[roomName].memory.publishedTask[lab.id].push(id);
        }
      }
    });
  }

  const run = () => {
    switch (Game.rooms[roomName].memory.labStatus) {
      case 'empty':
        emptyAllLab();
        break;
      case 'nothing':
        break;
      case 'work':
        work();
        break;
    }
  }

  return { setLabTask, run };
};
