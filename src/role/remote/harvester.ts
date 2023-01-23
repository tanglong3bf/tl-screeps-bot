export const roleRemoteHarvester = () => ({
    prepare: (creep: Creep) => {
        if (creep.room.name == 'W35N2') {
            creep.moveTo(new RoomPosition(25, 25, 'W36N2'));
            return;
        }
        const container: StructureContainer[] = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
        const sources: Source[] = creep.room.find(FIND_SOURCES);
        if (container.length > 0) {
            if (!creep.pos.isEqualTo(container[0].pos)) {
                creep.moveTo(container[0]);
            }
        } else {
            creep.moveTo(sources[0]);
        }
    },
    isReady: (creep: Creep) => {
        const container: StructureContainer[] = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
        const sources: Source[] = creep.room.find(FIND_SOURCES);
        if (container.length > 0) {
            return creep.pos.isEqualTo(container[0]);
        } else {
            return creep.pos.isNearTo(sources[0]);
        }
    },
    target: (creep: Creep) => {
        const sources: Source[] = creep.room.find(FIND_SOURCES, {filter: (source: Source) => source.pos.isNearTo(creep) });
        const containers = creep.room.getSourceContainers().filter(container => container.pos.isEqualTo(creep));
        let container = containers.length > 0 ? containers[0] : null;
        if (container && container.hits < container.hitsMax && creep.store.getUsedCapacity() > 0) {
            creep.repair(container);
        }
        creep.harvest(sources[0]);
    }
})
