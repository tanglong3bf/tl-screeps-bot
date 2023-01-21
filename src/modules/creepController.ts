import {creepApi} from "@/global/creepApi";
import {spawnExtension} from "@/mount/spawnExtension";

export const creatCreepController = (roomName: string) => {
  const roles = {
    /**
     * 最初始的采集爬，自己建container，自己修
     */
    'harvester1': {
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
            console.log(configName);
            // 当前房间的使用这个配置的爬
            const creeps: Creep[] = Game.rooms[roomName].find(FIND_MY_CREEPS, {
              'filter': (creep: Creep) => {
                return creep.memory.configName == configName;
              }
            });
            if (creeps.length == 0) {
              spawnExtension.addTask('harvester1', configName, false);
            }
          }
        }
      }
    },
    /**
     * 使用link的harvester
     */
    'harvester2': {
      autoConfig: () => {
      },
      autoPublish: () => {
      }
    }
  };
  const autoConfig = () => {
    if (!Game.rooms[roomName].controller || !Game.rooms[roomName].controller.my) {
      throw new Error(`房间${roomName}不是我控制的房间，无法进行自动配置`);
    }
    for (const name in roles) {
      roles[name].autoConfig();
    }
  };
  const autoPublish = () => {
    if (!Game.rooms[roomName].controller || !Game.rooms[roomName].controller.my) {
      throw new Error(`房间${roomName}不是我控制的房间，无法进行自动发布生成任务`);
    }
    for (const name in roles) {
      roles[name].autoPublish();
    }
  };
  const autoRun = () => {
    if (!Game.rooms[roomName].controller || !Game.rooms[roomName].controller.my) {
      throw new Error(`房间${roomName}不是我控制的房间，无法进行自动运行`);
    }
    for (const name in roles) {
      roles[name].autoConfig();
      roles[name].autoPublish();
    }
  };
  return {autoConfig, autoPublish, autoRun};
}
