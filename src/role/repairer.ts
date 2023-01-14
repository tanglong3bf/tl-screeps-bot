export const roleRepairer = (source?: Id<Source | Structure>) => ({
    source: (creep: Creep) => {
        // 结束一轮的修复，删除目标
        creep.memory.target = null;
        creep.getEnergy();
        return creep.store.getFreeCapacity() == 0;
    },
    target: (creep: Creep) => {
        // 已指定目标
        if (creep.memory.target != null) {
            let result = creep.repair(Game.getObjectById(creep.memory.target));
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target), {
                  maxRooms: 1
                });
            } else if (result == OK && Game.getObjectById(creep.memory.target).hits == Game.getObjectById(creep.memory.target).hitsMax) {
                creep.memory.target = null;
            }
        } else {
            // 未指定目标的话获取低于一定血量的建筑
            let targets: Structure[] = creep.room.find(FIND_STRUCTURES, {
                filter: (structure: Structure) => {
                    // 用塔修，排除掉
                    if (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) return false;
                    return (structure.structureType == STRUCTURE_WALL ||
                            structure.structureType == STRUCTURE_RAMPART) &&
                            structure.hits < structure.hitsMax * 0.01 ||
                            structure.hits < structure.hitsMax;
                }
            }).filter(structure => {
                // 这个filter用来让不同的维修爬锁定不同的目标
                let repairers: Creep[] = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
                let bj: boolean = false;
                repairers.forEach(repaier => {
                    if (!bj && repaier.memory.target == structure.id) {
                        bj = true;
                    }
                })
                return !bj;
            });

            // 当前房间内有要修的建筑
            if (targets.length > 0) {
                // 同血量优先级：rampart > 其他
                targets.sort((a, b) => {
                    if (b.structureType == a.structureType)
                        return a.hits - b.hits;
                    if (a.hits == b.hits) {
                      if (a.structureType == STRUCTURE_RAMPART) return -1;
                      if (b.structureType == STRUCTURE_RAMPART) return 1;
                    }
                    return a.hits - b.hits;
                });

                // 去修最惨的，并且之后的tick里锁定这个目标
                creep.memory.target = targets[0].id;
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {
                      maxRooms: 1
                    });
                }
            }
            else {
                // 没有需要修的建筑
                creep.memory.target = null;
            }
        }
        return creep.store.getUsedCapacity() == 0;
    }
})
