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

// 自定义的 Room 的拓展
export const roomExtension = {
  /**
   * 获取当前房间内所有存储能量的container
   */
  getEnergyContainer: function (): StructureContainer[] {
    const sources: Source[] = this.find(FIND_SOURCES);
    return this.find(FIND_STRUCTURES, {filter: (structure: Structure) => {
      if (structure.structureType != STRUCTURE_CONTAINER) return false;
      return sources.reduce((prev, current) => prev || current.pos.isNearTo(structure) , false);
    }})
  },
  publishTransferTask: function() {
    // 是我自己的房间
    if (this.controller && this.controller.my) {

      if (!this.memory.publishedTask) this.memory.publishedTask = {};

      // 发布fillExtension的任务
      if (!this.memory.publishedFillExtension && this.energyAvailable < this.energyCapacityAvailable) {
        this.addTransferTask({
          id: uuid(),
          type: 'fillExtension',
        });
      }

      // 发布fillTower的任务
      const tower_list: StructureTower[] = this.find(FIND_MY_STRUCTURES, {filter: (structure: any) => {
        if (this.memory.publishedTask[structure.id] && this.memory.publishedTask[structure.id].length > 0) return false;
        return structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 400;
      }});
      tower_list.forEach((tower) => {
        let id = uuid();
        this.addTransferTask({
          id: id,
          type: 'fillTower',
          to: tower.id,
          count: 400
        });
        if (!this.memory.publishedTask[tower.id]) {
          this.memory.publishedTask[tower.id] = [];
        }
        this.memory.publishedTask[tower.id].push(id);
      });
    }
  },
  /**
   * 添加一个房间内的物流任务
   */
  addTransferTask: function (transferTask: TransferTask): void {
    if (!this.memory.taskList) {
      this.memory.taskList = [];
    }
    this.memory.taskList.push(transferTask);
    if (transferTask.type == 'fillExtension') {
      this.memory.publishedFillExtension = true;
    }
  },
  haveTask: function(): boolean {
    return this.memory.taskList && this.memory.taskList.length > 0;
  },
  /**
   * 获取第一个任务
   */
  getFirstTask: function() {
    if (this.haveTask())
      return this.memory.taskList[0];
    return undefined;
  },
  /**
   * 完成第一个任务的一部分
   */
  completeFirstTask: function (amount: number): boolean {
    // 不存在任务队列或者任务队列中任务数量为0
    if (!this.memory.taskList || this.memory.taskList.length == 0) {
      return false;
    }
    // 如果是填充ex和spawn，单独处理布尔值
    if (this.memory.taskList[0].type == 'fillExtension') {
      if (this.energyAvailable == this.energyCapacityAvailable) {
        this.memory.publishedFillExtension = false;
        this.memory.taskList.shift();
        return true;
      }
    }
    // 完成了任务的一部分
    else if (this.memory.taskList[0].count > amount) {
      this.memory.taskList[0].count -= amount;
      return false;
    }
    // 完成了完整的任务
    else {
      let structureId: Id<Structure>;
      switch (this.memory.taskList[0].type) {
        case 'fillTower':
          case 'labIn':
          case 'fillNuker':
          structureId = this.memory.taskList[0].to;
        break;
        case 'labOut':
          structureId = this.memory.taskList[0].from;
        break;
      }
      for (const id in this.memory.publishedTask) {
        if (id == structureId) {
          this.memory.publishedTask[id].shift();
          break;
        }
      }
      this.memory.taskList.shift();
    }
    return true;
  }
}
