export const roleUpgrader = (source?: Id<Source | Structure>) => ({
    // 获取能量
    source: (creep: Creep) => {
        creep.getEnergy();

        // 自己身上的能量装满了，返回 true（切换至 target 阶段）
        return creep.store.getFreeCapacity() <= 0
    },
    // 升级控制器
    target: (creep: Creep) => {
        const controller = creep.room.controller
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller)

        // 自己身上的能量没有了，返回 true（切换至 source 阶段）
        return creep.store[RESOURCE_ENERGY] <= 0
    }
})
