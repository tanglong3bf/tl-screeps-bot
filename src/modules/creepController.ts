import {creepApi} from "@/global/creepApi";

export const creatCreepController = (roomName: string) => {
  const roles = {
    /**
     * 最初始的采集爬，自己建container，自己修
     */
    'harvester1': {
      /**
       * 每个房间需要两条harvester的配置，如果没有，就自动配置上
       */
      autoConfig: () => {
        // 获取所有能量矿
        const sources: Source[] = Game.rooms[roomName].find(FIND_SOURCES);
        sources.reduce((prev: number, source) => {
          // 配置名称
          const configName = `${roomName}_harvester_${prev}`;
          // 没有配置
          if (Memory.creepConfigs[configName] == undefined) {
            // 就添加配置
            creepApi.add(configName, 'harvester1', source.id);
          }
          return prev+1;
        }, 1);
      },

      autoPublish: () => {
        // 所有的配置
        for (const configName in Memory.creepConfigs) {
          // 当前房间的harvester1角色的配置
          if (configName.startsWith(`${roomName}_harvester_`) && Memory.creepConfigs[configName].role == 'harvester1') {
            // 当前房间的使用这个配置的爬
            const creeps: Creep[] = Game.rooms[roomName].find(FIND_MY_CREEPS, {
              'filter': { 'memory': { 'configName': configName}}
            });
            if (creeps.length == 0) {
              const spawns = Game.rooms[roomName].find(FIND_MY_SPAWNS);
              spawns.forEach((spawn) => {
                const flag = spawn.memory.spawnList.reduce((prev, current) => {
                  return prev || current.configName == configName;
                }, false);
                if (!flag) {
                  spawn.addTask('harvester1', configName, false);
                }
              });
            }
          }
        }
      }
    },

    /**
     * 使用link的harvester
     */
    'harvester2': {
      /**
       * 如果对应的source附近（两格内）修建了link，配置项内容添加link的id
       */
      autoConfig: () => {
        const config1 = Memory.creepConfigs[`${roomName}_harvester_1`];
        const config2 = Memory.creepConfigs[`${roomName}_harvester_2`];

        if (config1 && config1.role === 'harvester1') {
          const source: any = Game.getObjectById(config1.args[0]);
          if (source) {
            const links = source.room.find(FIND_MY_STRUCTURES, {filter: (structure: AnyStructure) => {
              structure.structureType == STRUCTURE_LINK && structure.pos.inRangeTo(source, 2);
            }});
            if (links && links.length > 0) {
              creepApi.add(`${roomName}_harvester_1`, 'harvester2', config1.args[0], links[0].id);
            }
          }
          const creeps: Creep[] = Game.rooms[roomName].find(FIND_MY_CREEPS, {filter: (creep: Creep) => creep.memory.role == 'harvester1'});
          creeps.forEach(creep => {creep.memory.continue = false; creep.suicide();});
        }

        if (config2 && config2.role === 'harvester1') {
          const source: any = Game.getObjectById(config2.args[0]);
          if (source) {
            const links = source.room.find(FIND_MY_STRUCTURES, {filter: (structure: AnyStructure) => {
              structure.structureType == STRUCTURE_LINK && structure.pos.inRangeTo(source, 2);
            }});
            if (links && links.length > 0) {
              creepApi.add(`${roomName}_harvester_2`, 'harvester2', config2.args[0], links[0].id);
            }
          }
          const creeps: Creep[] = Game.rooms[roomName].find(FIND_MY_CREEPS, {filter: (creep: Creep) => creep.memory.role == 'harvester2'});
          creeps.forEach(creep => {creep.memory.continue = false; creep.suicide();});
        }
      },

      autoPublish: () => {
        const config1 = Memory.creepConfigs[`${roomName}_harvester_1`];
        const config2 = Memory.creepConfigs[`${roomName}_harvester_2`];

        if (config1 && config1.args.length == 2) {
          // 当前房间的使用这个配置的爬
          const creeps: Creep[] = Game.rooms[roomName].find(FIND_MY_CREEPS, {
            'filter': { 'memory': { 'configName': `${roomName}_harvester_1`}}
          });
          if (creeps.length == 0) {
            const spawns = Game.rooms[roomName].find(FIND_MY_SPAWNS);
            spawns.forEach((spawn) => {
              const flag = spawn.memory.spawnList.reduce((prev, current) => {
                return prev || current.configName == `${roomName}_harvester_1`;
              }, false);
              if (!flag) {
                spawn.addTask('harvester2',  `${roomName}_harvester_1`, false);
              }
            });
          }
        }

        if (config2 && config2.args.length == 2) {
          // 当前房间的使用这个配置的爬
          const creeps: Creep[] = Game.rooms[roomName].find(FIND_MY_CREEPS, {
            'filter': { 'memory': { 'configName': `${roomName}_harvester_2`}}
          });
          if (creeps.length == 0) {
            const spawns = Game.rooms[roomName].find(FIND_MY_SPAWNS);
            spawns.forEach((spawn) => {
              const flag = spawn.memory.spawnList.reduce((prev, current) => {
                return prev || current.configName == `${roomName}_harvester_2`;
              }, false);
              if (!flag) {
                spawn.addTask('harvester2',  `${roomName}_harvester_2`, false);
              }
            });
          }
        }
      }
    },

    /**
     * 元素矿采集爬
     */
    'miner': {
      autoConfig: () => {
        if (Game.rooms[roomName].controller.level < 6) return;
        Game.rooms[roomName].find(FIND_MINERALS);
      },

      autoPublish: () => {
      }
    },

    /**
     * 建筑爬
     */
    'builder': {
      autoPublish: () => {
        if (Game.rooms[roomName].find(FIND_MY_CONSTRUCTION_SITES).length > 0
            && Game.rooms[roomName].find(FIND_MY_CREEPS, {filter: {memory: {role: 'builder'}}}).length == 0
          && Game.spawns[`${roomName}S1`].memory.spawnList.filter((task) => task.role === 'builder').length == 0) {
            Game.spawns[`${roomName}S1`].addTask('builder', 'builder', false);
          }
      }
    },
  };
  const autoConfig = () => {
    if (Game.time % 3) return;
    if (!Game.rooms[roomName].controller || !Game.rooms[roomName].controller.my) {
      throw new Error(`房间${roomName}不是我控制的房间，无法进行自动配置`);
    }
    for (const name in roles) {
      if (roles[name].autoConfig) {
        roles[name].autoConfig();
      }
    }
  };
  const autoPublish = () => {
    if (Game.time % 3) return;
    if (!Game.rooms[roomName].controller || !Game.rooms[roomName].controller.my) {
      throw new Error(`房间${roomName}不是我控制的房间，无法进行自动发布生成任务`);
    }
    for (const name in roles) {
      if (roles[name].autoPublish) {
        roles[name].autoPublish();
      }
    }
  };
  const autoRun = () => {
    if (!Game.rooms[roomName].controller || !Game.rooms[roomName].controller.my) {
      throw new Error(`房间${roomName}不是我控制的房间，无法进行自动运行`);
    }
    for (const name in roles) {
      if (roles[name].autoConfig) {
        roles[name].autoConfig();
      }
      if (roles[name].autoPublish) {
        roles[name].autoPublish();
      }
    }
  };
  return {autoConfig, autoPublish, autoRun};
}
