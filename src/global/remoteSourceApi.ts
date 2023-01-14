import { createRemoteSourceController } from "@/modules/remoteSourceController";


export const remoteSourceApi = {
  add (roomName: string, remoteRoomName: string, sourceId: Id<Source>) {
    const ret = createRemoteSourceController(roomName).addRemoteSource(remoteRoomName, sourceId);
    console.log('添加外矿配置成功，现有' + ret + '条配置');
    return ret;
  },
  remove (roomName: string, remoteRoomName: string, sourceId: Id<Source>) {
    if (createRemoteSourceController(roomName).removeRemoteSource(remoteRoomName, sourceId)) {
      console.log('删除外矿配置成功');
      return true;
    }
    console.log('删除外矿配置失败');
    return false;
  }
}
