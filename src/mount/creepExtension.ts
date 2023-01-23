import { creepApi } from "@/global/creepApi";
import { roleBuilder } from "@/role/builder";
import { roleCarrier } from "@/role/carrier";
import { roleClaimer } from "@/role/remote/claimer";
import { roleCenter } from "@/role/center";
import { roleHarvester } from "@/role/harvester";
import { roleRemoteAttacker } from "@/role/remote/attacker";
import { roleRemoteBuilder } from "@/role/remote/builder";
import { roleRemoteCarrier } from "@/role/remote/carrier";
import { roleRemoteHarvester } from "@/role/remote/harvester";
import { roleRepairer } from "@/role/repairer";
import { roleUpgrader } from "@/role/upgrader";
import {roleRemoteUpgrader} from "@/role/remote/upgrader";
import {roleStealer} from "@/role/remote/stealer";
import {roleHarvester1} from "@/role/harvester1";

const roles = {
  upgrader: roleUpgrader,
  builder: roleBuilder,
  center: roleCenter,
  carrier: roleCarrier,
  repairer: roleRepairer,
  harvester: roleHarvester,
  harvester1: roleHarvester1,
  remoteHarvester: roleRemoteHarvester,
  remoteCarrier: roleRemoteCarrier,
  remoteBuilder: roleRemoteBuilder,
  attacker: roleRemoteAttacker,
  claimer: roleClaimer,
  remoteUpgrader: roleRemoteUpgrader,
  stealer: roleStealer
}


// 自定义的 Creep 的拓展
export const creepExtension = {
  /**
   * 获取能量
   */
  getEnergy: function (this: Creep): void {
    // 先尝试从仓库中获取能量
    const storage = this.room.storage;
    if (storage != undefined && storage.my && storage.store[RESOURCE_ENERGY] > 0) {
      if (this.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.say('干饭干饭！');
        this.moveTo(storage);
      }
      return;
    }
    // 没有仓库就亲自采矿
    this.harvestSource();
  },
  /**
   * 开采同房间能量矿
   * 返回值表明是否成功
   */
  harvestSource: function (sourceId?: Id<Source>): boolean {
    // 指定目标，开采指定能量矿
    if (sourceId) {
      const source: Source = Game.getObjectById(sourceId);
      if (source == undefined || source.room.name != this.room.name) {
        console.log('爬爬'+this.name+'所在的房间' + this.room.name + '没找到id为'+sourceId+'的能量矿');
        return false;
      }
      if (this.harvest(source) == ERR_NOT_IN_RANGE) {
        this.moveTo(source);
      }
      return true;
    }
    // 没指定目标，开采最近的能量矿
    const sources: Source[] = this.room.find(FIND_SOURCES);
    if (sources.length > 0) {
      sources.sort((a, b) => this.pos.getRangeTo(a) - this.pos.getRangeTo(b));
      if (this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        this.moveTo(sources[0]);
      }
      if (Game.time % 2) {
        this.say('还要亲自采矿');
      } else {
        this.say('累死个爬了');
      }
      return true;
    } else {
      console.log('爬爬'+this.name+'所在的房间' + this.room.name + '没有能量矿');
      return false;
    }
  },
  /**
   * 爬预定一个目标建筑，需要在同一个房间
   */
  reserveTarget: function(this: Creep, structure: Structure): boolean {
    // 不在同一个房间
    if (this.room != structure.room) return false;
    // 建筑已经被预定
    if (this.room.memory.reserveList[structure.id]) return false;

    this.room.memory.reserveList[structure.id] = this.id;
    this.memory.target = structure.id;
    return true;
  },
  /**
   * 抽象角色系统的工作流程
   */
  work: function() {
    // ------------------------ 第一步：获取 creep 执行逻辑 ------------------------

    // 获取对应配置项
    const creepConfig = creepApi.get(this.memory.configName)
    // 检查 creep 内存中的配置是否存在
    if (!creepConfig) {
      console.log(`creep ${this.name} 携带了一个无效的配置项 ${this.memory.configName}`)
      this.say('找不到配置！')
      return 
    }
    try {
    var creepLogic = roles[creepConfig.role](...creepConfig.args)
    } catch (e) {
      console.log(creepConfig.role);
      console.log(creepConfig.args);
    }

    // ------------------------ 第二步：执行 creep 准备阶段 ------------------------

    if (this.room.name == 'W32N3' && this.role == 'harvester1')
    console.log(123);

    // 没准备的时候就执行准备阶段
    if (!this.memory.ready) {
      // 有准备阶段配置则执行
      if (creepLogic.prepare && creepLogic.isReady) {
        creepLogic.prepare(this)
        this.memory.ready = creepLogic.isReady(this)
      }
      // 没有就直接准备完成
      else {
        this.memory.ready = true
      }
      return
    }


    // ------------------------ 记录准备阶段耗时 -----------------------------------
    // 有1t的延迟

    if (!this.memory.readyTime) {
      this.memory.readyTime = 1500 - this.ticksToLive;
    }

    // ------------------------ 第三步：执行 creep 工作阶段 ------------------------
    

    let stateChange = true
    // 执行对应阶段
    // 阶段执行结果返回 true 就说明需要更换 working 状态
    if (this.memory.working) {
      if (creepLogic.target) stateChange = creepLogic.target(this)
    }
    else {
      if (creepLogic.source) stateChange = creepLogic.source(this)
    }

    // 状态变化了就切换工作阶段
    if (stateChange) this.memory.working = !this.memory.working

    // 提前产卵
    if (this.memory.continue && !this.memory.published) {
      // 考虑准备时间和产卵时间
      if (this.ticksToLive <= this.body.length * 3 + this.memory.readyTime) {
        Game.spawns[this.memory.spawn].addTask(this.memory.role, this.memory.configName);
        this.memory.published = true;
      }
    }
  }
}
