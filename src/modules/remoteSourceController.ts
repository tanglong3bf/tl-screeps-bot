export const createRemoteSourceController = (roomName: string) => {
  /**
   * 添加一个外矿配置
   */
    const addRemoteSource = (remoteRoomName: string, sourceId: Id<Source>) => {
        if (!Memory.rooms[roomName].remoteSource) Memory.rooms[roomName].remoteSource = [];
        Memory.rooms[roomName].remoteSource.push({remoteRoomName, sourceId});
        return Memory.rooms[roomName].remoteSource.length;
    };
    /**
     * 删除一个外矿配置
     */
    const removeRemoteSource = (remoteRoomName: string, sourceId: Id<Source>) => {
        const length = Memory.rooms[roomName].remoteSource.length;
        Memory.rooms[roomName].remoteSource = Memory.rooms[roomName].remoteSource.filter(item => {
            return item.remoteRoomName === remoteRoomName && item.sourceId === sourceId;
        })
        return Memory.rooms[roomName].remoteSource.length == length - 1;
    };
    /**
     * 获取当前房间的所有外矿配置
     */
    const checkRemote = () => {
      return Memory.rooms[roomName].remoteSource;
    }
    return { addRemoteSource, removeRemoteSource, checkRemote };
};
