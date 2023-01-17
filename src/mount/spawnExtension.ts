import { creepConfig } from '../config/creepConfig';
// 自定义的 Spawn 的拓展
export const spawnExtension = {
    /**
     * 检查任务队列
     */
    work: function(this: StructureSpawn) {
        if (this.memory.spawnList == undefined) {
            this.memory.spawnList = [];
        }
        console.log(this.name + ': ' + this.memory.spawnList.reduce((prev: string, current: SpawnTask) => {
          return prev + '{role: ' + current.role + ', configName: ' + current.configName + '},';
        }, '[') + ']');
        // 自己已经在生成了 / 内存里没有生成队列 / 生产队列为空 就啥都不干
        if (this.spawning || !this.memory.spawnList || this.memory.spawnList.length == 0) return;
        // 进行生成
        const spawnSuccess = this.mainSpawn(this.memory.spawnList[0])
        // 生成成功后移除任务
        if (spawnSuccess) this.memory.spawnList.shift()
    },
    /**
     * 将生成任务推入队列
     */
    addTask: function(role: string, configName: string, isRemote?: boolean): number {
      if (isRemote == undefined) isRemote = false;
        // 任务加入队列
        this.memory.spawnList.push({role, configName, isRemote});
        return this.memory.spawnList.length
    },
    /**
     * creep生成主要实现
     */
    mainSpawn: function(task: SpawnTask): boolean {
        let body: BodyPartConstant[];
        const bodyList = creepConfig[task.role].bodyList;
        // 获取能生产的能量最高的身体部件
        bodyList.forEach(element => {
            if (body) return;
            if (element.energy <= this.room.energyAvailable) {
                body = element.body;
            }
        });
        const ret = this.spawnCreep(body, task.role + Game.time,
            {
                memory: {
                    role: task.role,
                    configName: task.configName,
                    continue: true,
                    readyTime: 0,
                    spawn: this.name,
                    isRemote: task.isRemote
                }
            }
        );
        return ret == OK;
    }
}
