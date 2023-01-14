export const roleClaimer = () => ({
    prepare: (creep: Creep) => {
        if (creep.room.name != 'W32N3') {
            creep.moveTo(new RoomPosition(25, 25, 'W32N3'));
        }
    },
    isReady: (creep: Creep) => {
        return creep.room.name == 'W32N3';
    },
    target: (creep: Creep) => {
        if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
});
