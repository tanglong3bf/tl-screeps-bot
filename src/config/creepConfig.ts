export const creepConfig = {
  /**
   * 挖运分离的采集者
   */
    harvester: {
        role: 'harvester',
        bodyList: [
            {
                body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
                energy: 1350
            },
            {
                body: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
                energy: 700
            },
            {
                body: [WORK, CARRY, MOVE, MOVE],
                energy: 250
            }
        ]
    },
    /**
     * 亲自挖，挖完修容器的采集爬，等到容器建好后
     */
    harvester1: {
        role: 'harvester1',
        bodyList: [
            {
                body: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                energy: 1250
            },
            {
                body: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                energy: 1000
            },
            {
                body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                energy: 750
            },
            {
                body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
                energy: 500
            },
            {
                body: [WORK, CARRY, MOVE, MOVE],
                energy: 250
            }
        ]
    },
    /**
     * 有container，挖运分离的采集爬
     */
    harvester2: {
        role: 'harvester2',
        bodyList: [
            {
                body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
                energy: 750
            },
            {
                body: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
                energy: 600
            },
            {
                body: [WORK, WORK, WORK, MOVE, MOVE, MOVE],
                energy: 450
            },
            {
                body: [WORK, WORK, MOVE, MOVE],
                energy: 300
            },
            {
                body: [WORK, MOVE],
                energy: 150
            }
        ]
    },
    /**
     * 有link，自己射的采集爬
     */
    harvester3: {
        role: 'harvester3',
        bodyList: [
            {
                body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                energy: 1400
            },
            {
                body: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
                energy: 600
            },
            {
                body: [WORK, CARRY, MOVE],
                energy: 200
            }
        ]
    },
    /**
     * 建筑爬
     */
    builder: {
        role: 'builder',
        bodyList: [
            {
                body: [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                energy: 1000
            },
            {
                body: [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                energy: 800
            },
            {
                body: [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                energy: 600
            },
            {
                body: [WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                energy: 400
            },
            {
                body: [WORK, CARRY, MOVE, MOVE],
                energy: 250
            }
        ]
    },
    /**
     * 维修爬
     */
    repairer: {
        role: 'repairer',
        bodyList: [
            {
                body: [WORK, CARRY, MOVE,WORK, CARRY, MOVE,WORK, CARRY, MOVE,WORK, CARRY, MOVE,WORK, CARRY, MOVE,],
                energy: 1000
            },
            {
                body: [WORK, CARRY, MOVE,WORK, CARRY, MOVE,WORK, CARRY, MOVE,WORK, CARRY, MOVE,],
                energy: 800
            },
            {
                body: [WORK, CARRY, MOVE,WORK, CARRY, MOVE,WORK, CARRY, MOVE,],
                energy: 600
            },
            {
                body: [WORK, CARRY, MOVE, WORK, CARRY, MOVE,],
                energy: 400
            },
            {
                body: [WORK, CARRY, MOVE, MOVE],
                energy: 250
            }
        ]
    },
    /**
     * 升级爬
     */
    upgrader: {
        role: 'upgrader',
        bodyList: [
            {
                body: [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                energy: 1000
            },
            {
                body: [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                energy: 800
            },
            {
                body: [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                energy: 600
            },
            {
                body: [WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                energy: 400
            },
            {
                body: [WORK, CARRY, MOVE, MOVE],
                energy: 250
            }
        ]
    },
    /**
     * 房间内搬运爬
     */
    carrier: {
        role: 'carrier',
        bodyList: [
            {
                body: [CARRY, MOVE, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, MOVE],
                energy: 900
            },
            {
                body: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
                energy: 700
            },
            {
                body: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
                energy: 500
            },
            {
                body: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
                energy: 300
            },
            {
                body: [CARRY, MOVE, CARRY, MOVE],
                energy: 200
            }
        ]
    },
    /**
     * 跨房间建筑爬，主要是新房间起步
     */
    remoteBuilder: {
        role: 'remoteBuilder',
        bodyList: [
            {
                body: [WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, CARRY, MOVE],
                energy: 3100
            },
            {
                body: [WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE],
                energy: 1250
            },
            {
                body: [WORK, CARRY, MOVE, MOVE],
                energy: 250
            }
        ]
    },
    /**
     * 小偷，偷东西
     */
    stealer: {
        role: 'stealer',
        bodyList: [
            {
                body: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
                energy: 2500
            },
            {
                body: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
                energy: 1000
            },
            {
                body: [CARRY, CARRY, MOVE, MOVE],
                energy: 200
            }
        ]
    },
    /**
     * 跨房间升级爬，用于新房初步稳定
     */
    remoteUpgrader: {
        role: 'remoteUpgrader',
        bodyList: [
            {
                body: [WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE],
                energy: 1000
            },
            {
                body: [WORK, CARRY, MOVE, MOVE],
                energy: 250
            }
        ]
    },
    /**
     * 占房爬
     */
    claimer: {
        role: 'claimer',
	// configNAme: 'claimer',
        bodyList: [
            {
                body: [CLAIM, MOVE],
                energy: 650
            }
        ]
    },
    /**
     * 中央爬
     */
    center: {
        role: 'center',
        bodyList: [
            {
                body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE],
                energy: 850
            },
            {
                body: [CARRY, CARRY, CARRY, MOVE],
                energy: 200
            }
        ]
    },
    /**
     * 跨房间拆墙工dismantler
     */
    attacker: {
        role: 'attacker',
        bodyList: [
            {
                body: [WORK, WORK, MOVE, MOVE, WORK,
                    WORK, MOVE, MOVE, WORK, WORK,
                    MOVE, MOVE, WORK, WORK, MOVE,
                    MOVE, WORK, WORK, MOVE, MOVE,
                    WORK, WORK, MOVE, MOVE, WORK,
                    WORK, MOVE, MOVE, WORK, WORK,
                    MOVE, MOVE, WORK, WORK, MOVE,
                    MOVE, WORK, WORK, MOVE, MOVE,
                    WORK, WORK, MOVE, MOVE],
                energy: 3300
            },
            {
                body: [WORK, WORK, MOVE, MOVE],
                energy: 300
            }
        ]
    },
    /**
     * 外矿搬运爬，搬掉落或者容器
     */
    remoteCarrier: {
        role: 'remoteCarrier',
        bodyList: [
            {
                body: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
                energy: 600
            },
            {
                body: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
                energy: 500
            },
            {
                body: [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
                energy: 450
            },
            {
                body: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
                energy: 350
            },
            {
                body: [WORK, CARRY, CARRY, MOVE, MOVE],
                energy: 300
            },
            {
                body: [WORK, CARRY, MOVE, MOVE],
                energy: 250
            }
        ]
    },
    /**
     * 外矿采集者，有容器就检查并修容器，没有容器就扔地上
     */
    remoteHarvester: {
        role: 'remoteHarvester',
        bodyList: [,
            {
                body: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
                energy: 700
            },
            {
                body: [WORK, CARRY, MOVE, MOVE],
                energy: 250
            }
        ]
    }
}
