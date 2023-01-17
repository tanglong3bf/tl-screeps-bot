export const creepApi = {
    /**
     * 新增 creep 配置项
     * @param configName 配置项名称
     * @param role 该 creep 的角色
     * @param args creep 的工作参数
     */
    add(configName: string, role: string, ...args: any[]) {
        if (!Memory.creepConfigs) Memory.creepConfigs = {}
        Memory.creepConfigs[configName] = { role, args }
        
        return `${configName} 配置项已更新：[角色] ${role} [工作参数] ${args}`
    },
    /**
     * 移除指定 creep 配置项
     * @param configName 要移除的配置项名称
     */
    remove(configName: string) {
        delete Memory.creepConfigs[configName]
        return `${configName} 配置项已移除`
    },
    /**
     * 获取 creep 配置项
     * @param configName 要获取的配置项名称
     * @returns 对应的配置项，若不存在则返回 undefined
     */
    get(configName: string) {
        if (!Memory.creepConfigs) return undefined
        return Memory.creepConfigs[configName]
    }
}

global.creepApi = creepApi;