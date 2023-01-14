import { errorMapper } from "./modules/errorMapper";

import { creepExtension } from './mount/creepExtension';
import { roomExtension } from "./mount/roomExtension";
import { spawnExtension } from "./mount/spawnExtension";

import {remoteSourceApi} from "./global/remoteSourceApi";
import {marketApi} from "./global/marketApi";
import {creatLabController} from "./modules/labController";

global.remoteSourceApi = remoteSourceApi;
global.marketApi = marketApi;

export const loop = errorMapper(() => {
  _.assign(Creep.prototype, creepExtension);
  _.assign(Room.prototype, roomExtension);
  _.assign(Spawn.prototype, spawnExtension);

  // 清除已经死亡的creep的内存
  for(let name in Memory.creeps) {
    if(!Game.creeps[name]) {
      // 添加生成任务
      if (Memory.creeps[name].continue && !Memory.creeps[name].published) {
        Game.spawns[Memory.creeps[name].spawn].addTask(Memory.creeps[name].role, Memory.creeps[name].configName);
      }

      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
      // 同时清空预定目标
      for (const roomName in Game.rooms) {
        const reserveList = Game.rooms[roomName].memory.reserveList;
        for (const structureId in reserveList) {
          if (!Game.getObjectById(reserveList[structureId])) {
            reserveList[structureId] = null;
          }
        }
      }
    }
  }

  // 这玩应我想删了
  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName];
    if (room.memory.reserveList === undefined) {
      room.memory.reserveList = {};
    }
  }

  // 所有的Spawn进行工作
  for (const name in Game.spawns) {
    Game.spawns[name].work();
  }

  // 所有的Room进行工作
  for (const name in Game.rooms) {
    Game.rooms[name].autoConfig();
    Game.rooms[name].publishTransferTask();
  }

  // if (Game.rooms['W38N4'].terminal.store[RESOURCE_ZYNTHIUM] >= 1000) {
    // Game.rooms['W38N4'].terminal.send(RESOURCE_ZYNTHIUM, 1000, 'W35N2');
  // }

  // 所有的Creep进行工作
  Object.values(Game.creeps)
    .filter(creep => true)
    .forEach(creep => creep.work());

  // 所有的Tower进行工作
  for (const name in Game.rooms) {
    const tower_list: StructureTower[] = Game.rooms[name].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

    if (tower_list.length > 0) {
      tower_list.forEach(tower => {
        //攻击最近的敌人
        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
          if (closestHostile.owner.username != 'xianda1314') {
            tower.attack(closestHostile);
          }
        } else {
          // 没有敌人的话，修路和容器
          const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
              return (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER)
              && structure.hits < structure.hitsMax;
            }
          });
          if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
          }
        }
      })
    }
  }

  const labController1 = creatLabController('W35N2');
  labController1.run();

  const labController2 = creatLabController('W38N4');
  labController2.run();

  if (Game.cpu.bucket == 10000) {
    Game.cpu.generatePixel();
  }
})

/** TODO:
 *
 * 外矿可配置，房间名、外矿id，运回仓库
 *
 * 外矿开采效率还不满
 *
 * 添加元素矿采集爬
 *
 * 根据能量调整升级爬数量
 *
 * 删除掉没用的配置
 *
 * center爬转移逻辑
 *
 * 跨房间转移资源，也搞一个任务队列吧
 *
 * lab：也整一个任务配置吧，期望数量，材料不够就发物流任务，产物也发物流任务到仓库
 * 可以拆分任务，缺材料的话，log
 *
 * bodylist没必要记录需要的能量，临时凑合着用，以后改为根据bodylist自动计算需要的能量
 *
 * factory任务队列，如压bar
 *
 * lab切换合成状态和boost状态，在boost状态下
 *
 * 不同类型的爬抽离公共部分代码（不断优化）
 *
 */
