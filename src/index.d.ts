// ------------------------------ creep -----------------------------

interface CreepMemory {
  /**
   * 该 creep 的角色
   */
  role: string
  /**
   * 使用的配置，可用于同role爬区分目标
   */
  configName: string
  /**
   * 在工作状态还是获取能量状态
   */
  working?: boolean
  /**
   * 维修爬区分不同目标，后期考虑删除
   */
  target?: Id<Structure>
  /**
   * 死亡后是否继续产卵
   */
  continue: boolean
  /**
   * 搬运爬会用到区分不同细分工作，后期考虑删除，用configName进行区分
   */
  type?: string
  /**
   * 是否已经发布了产卵任务
   */
  published?: boolean
  /**
   * 准备工作需要的时间，提前发布产卵任务需要这个参数
   */
  readyTime?: number
  /**
   * 产自哪个spawn，添加生成任务时也只添加到这里
   */
  spawn: string
  /**
   * 已经领取的任务
   */
  taskId?: string
  /**
   * 是否是多房间爬
   */
  isRemote?: boolean
}

interface Creep {
  /**
   * 获取能量
   */
  getEnergy(): void
  /**
   *
   */
  harvestSource(sourceId?: Id<Source>): boolean
  /**
   * 预定一个建筑，维修爬区分目标用，后期考虑删除
   * @param target 
   */
  reserveTarget(target: Structure): boolean
  /**
   * 统一的工作流程，状态切换也在这里完成
   */
  work(): void
}

/**
 * creep 生命周期阶段
 */
interface CreepLifeCycle {
  /**
   * [可选] 准备阶段，接受 creep 并执行对应的准备逻辑
   */
  prepare?: (creep: Creep) => void
  /**
   * [可选] 是否已经准备完成
   */
  isReady?: (creep: Creep) => boolean
  /**
   * [必须] 工作阶段，接受 creep 并执行对应的工作逻辑（例如建造建筑，升级控制器）
   * 在返回 true 时代表所需资源不足，将在下个 tick 开始执行 source 阶段
   */
  target: (creep: Creep) => boolean
  /**
   * [可选] 资源获取阶段，接受 creep 并执行对应的资源获取逻辑（例如获取能量，采集矿物）
   * 在返回 true 时代表能量获取完成，将在下个 tick 开始执行 target 阶段
   */
  source?: (creep: Creep) => boolean
}

// ------------------------------ room -----------------------------

interface RoomMemory {
  /**
   * 维修爬预订的目标，后期考虑删除
   */
  reserveList: {
    [structureId: Id<Structure>]: Id<Creep> 
  }
  /**
   * 外矿列表
   */
  remoteSource: RemoteSource[]
  /**
   * 物流任务队列
   */
  taskList: TransferTask[]
  /**
   * 是否存在填充ex的任务
   */
  publishedFillExtension: boolean
  /**
   * 建筑发布过的任务，通过检查自己的任务队列的数量，可以避免重复发布任务
   */
  publishedTask?: {
    [structureId: Id<Structure>]: string[]
  }
  /**
   * 实验室的当前任务
   */
  labTask: string
  /**
   * 实验室的阶段
   * nothing: 什么都不做
   * working: 正常合成
   * waiting: 等待原料
   * empty: 清空所有lab，包括原料和产物
   * prepare: 准备阶段，填充原料
   */
  labStatus: string
}

interface Room {
  /**
   * 获取当前房间内所有存储能量的container
   */
  getEnergyContainer(): StructureContainer[]

  /**
   * 添加一个物流任务，每个房间都有自己的物流任务队列
   */
  addTransferTask(transferTask: TransferTask): void

  publishTransferTask(): void

  haveTask(): boolean

  getFirstTask(): TransferTask

  completeFirstTask(amount: number): boolean
}

/**
 * 外矿配置
 */
interface RemoteSource {
  /**
   * 外矿房间名
   */
  remoteRoomName: string
  /**
   * 外矿
   */
  sourceId: Id<Source>

}

/**
 * 物流任务
 */
interface TransferTask {
  id: string
  /**
   * fillExtension时，count有效
   * fillTower 小于等于600时发布，只有to有效，表明填充到的塔，填充400
   * labIn from可以省略，固定为仓库
   * labOut to可以省略，固定为仓库
   * fillNuker to可以省略
   */
  type: string
  /**
   * 来源
   */
  from?: Id<Structure>,
  /**
   * 目的
   */
  to?: Id<Structure>,
  /**
   * 资源的类型，RESOURCE_*的各种宏
   */
  sourceType?: String,
  /**
   * 数量
   */
  count?: number,
}

// ------------------------------ spawn -----------------------------

interface SpawnMemory {
  /**
   * 产卵队列，存的是role，后期需要同时添加configName和附带参数
   */
  spawnList: SpawnTask[]
}

interface StructureSpawn {
  /**
   * 检查任务队列
   */
  work(this: StructureSpawn): void,
  /**
   * 将生成任务推入队列
   */
  addTask(role: string, configName: string, isRemote?: boolean): number,
  /**
   * creep生成主要实现
   */
  mainSpawn(spawnTask: SpawnTask): boolean
}

/**
 * 产卵任务
 */
interface SpawnTask {
  /**
   * 角色
   */
  role: string,
  /**
   * 配置
   */
  configName: string,
  /**
   * 是否是多房间
   */
  isRemote?: boolean
}

// ------------------------------ common -----------------------------

interface Memory {
  /**
   * 同role下不同爬的细分配置，比如采集者采集不同的能量矿
   */
  creepConfigs: {
    [configName: string]: CreepConfig 
  }
}

interface CreepConfig {
  role: string
  args: any[]
}
