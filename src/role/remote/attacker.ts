export const roleRemoteAttacker = () => ({
    prepare: (creep:Creep) => {
        if (creep.room.name == 'W35N2') {
            creep.moveTo(new RoomPosition(25, 25, 'W35N3'));
        }
        if (creep.room.name == 'W35N3') {
            creep.moveTo(new RoomPosition(25, 25, 'W35N4'));
        }
        if (creep.room.name == 'W35N4') {
            creep.moveTo(new RoomPosition(25, 25, 'W36N4'));
        }
        if (creep.room.name == 'W36N4') {
            creep.moveTo(new RoomPosition(25, 25, 'W37N4'), {
                costCallback(_roomName, costMatrix) {
                    for (let i = 8; i <= 16; ++i) {
                        for (let j = 30; j <= 38; ++j) {
                            costMatrix.set(i, j, 255)
                        }
                    }
                },
            });
        }
    },
    isReady: (creep: Creep) => {
        return creep.room.name == 'W37N4';
    },
    target: function(creep: Creep) {
        let wall = creep.room.lookAt(22, 17);
        if (wall[0][LOOK_STRUCTURES]) {
            if (creep.dismantle(wall[0][LOOK_STRUCTURES]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(wall[0][LOOK_STRUCTURES]);
            }
        } else {
            let rampart1 = creep.room.lookAt(21, 18);
            if (rampart1[0][LOOK_STRUCTURES]) {
                if (creep.dismantle(rampart1[0][LOOK_STRUCTURES]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(rampart1[0][LOOK_STRUCTURES]);
                }
            } else {
                let rampart2 = creep.room.lookAt(21, 19);
                if (rampart2[0][LOOK_STRUCTURES]) {
                    if (creep.dismantle(rampart2[0][LOOK_STRUCTURES]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(rampart2[0][LOOK_STRUCTURES]);
                    }
                } else {
                    creep.memory.continue = false;
                }
            }
        }
    }
});
