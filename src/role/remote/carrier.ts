export const roleRemoteCarrier = () => ({
    source: function(creep: Creep) {
        if (creep.room.name == 'W35N2') {
            creep.moveTo(new RoomPosition(25, 25, 'W36N2'))
        } else {
            const container = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
            if (container.length > 0) {
                const ret = creep.withdraw(container[0], RESOURCE_ENERGY);
                if (ret == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container[0]);
                }
            } else {
                const resources = creep.room.find(FIND_DROPPED_RESOURCES);
                if (creep.pickup(resources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(resources[0]);
                }
            }
        }
        return creep.store.getFreeCapacity() == 0;
    },
    target: function(creep: Creep) {
        if (creep.room.name == 'W36N2') {
            let roads: StructureRoad[] = creep.room.find(FIND_STRUCTURES, {
                filter: (structure: Structure) => {
                    return (structure.hits <= 3000 && structure.pos.isEqualTo(creep.pos))
                }
            });
            if (roads.length > 0) {
                creep.repair(roads[0]);
            } else {
                creep.moveTo(new RoomPosition(25, 25, 'W35N2'));
            }
        } else {
            const storage = creep.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_STORAGE}});
            if (creep.transfer(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage[0]);
            }
        }
        return creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0;
    }
});
