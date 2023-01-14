import {creepApi} from "@/global/creepApi";

export const roomAutoConfig = {
  harvester1: function(room: Room) {
    // container数量够了，就不需要这种最简的harvester了
    // 其他爬从这里取或者统一运到中央存储
    if (room.getEnergyContainer().length == room.find(FIND_SOURCES).length) {
      return;
    }
    // 有storage，挖运分离，哪怕扔地上，也要分离
    if (room.storage && room.storage.my) {
      return;
    }

    // -------------------- 先补全当前房间需要的配置 -----------------------

    const sources = room.find(FIND_SOURCES);
    const configs = {};
    // 先获取到已经有的配置
    for (const configName in Memory.creepConfigs) {
      const config = Memory.creepConfigs[configName];
      const source: any = Game.getObjectById(config.args[0]);
      if (config.role == 'harvester1' && source.pos.roomName == room.name) {
        configs[configName] = config;
      }
    }
    // 每一个能量矿都判断一下，没有对应的配置就加上
    sources.forEach(source => {
      let bj = false;
      for (const configName in configs) {
        bj = configs[configName].args[0] == source.id;
        if (bj) break;
      }
      if (!bj) {
        const configName = `harvester1_${room.name}_${source.id}`;
        creepApi.add(configName, 'harvester1', source.id);
        // 主要是循环的时候要用到
        configs[configName] = { role: 'harvester1', args: [source.id] };
      }
    });
  },

  harvester2: function (room: Room) {
    return;
    // container数量不够，就什么都不做
    if (room.getEnergyContainer().length < room.find(FIND_SOURCES).length) {
      return;
    }
    // 有storage，挖运分离，哪怕扔地上，也要分离
    if (room.storage && room.storage.my) {
      return;
    }

    // -------------------- 先补全当前房间需要的配置 -----------------------

    const sources = room.find(FIND_SOURCES);
    const configs = {};
    // 先获取到已经有的配置
    for (const configName in Memory.creepConfigs) {
      const config = Memory.creepConfigs[configName];
      const source: any = Game.getObjectById(config.args[0]);
      if (config.role == 'harvester2' && source.pos.roomName == room.name) {
        configs[configName] = config;
      }
    }
    // 每一个能量矿都判断一下，没有对应的配置就加上
    sources.forEach(source => {
      let bj = false;
      for (const configName in configs) {
        bj = configs[configName].args[0] == source.id;
        if (bj) break;
      }
      if (!bj) {
        const configName = `harvester2_${room.name}_${source.id}`;
        creepApi.add(configName, 'harvester2', source.id);
        // 主要是循环的时候要用到
        configs[configName] = { role: 'harvester2', args: [source.id] };
      }
    });
  },

  harvester3: function (room: Room) {
  },

  builder: function (room: Room) {
  },

  upgrader: function (room: Room) {
  },

  carrier: function (room: Room) {
  },

  repairer: function (room: Room) {
  },

  center: function (room: Room) {
  }
}
