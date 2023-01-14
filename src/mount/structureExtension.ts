export const structureExtension = {
  addTransferTask: function(transferTask: TransferTask): boolean {
    if (!this.room.memory.publishedTask[this.id] || this.room.memory.publishedTask[this.id].length == 0) {
      this.room.addTransferTask(transferTask);
      this.room.memory.publishedTask[this.id] = [];
      this.room.memory.publishedTask[this.id].push(transferTask.id);
      return true;
    }
    return false;
  }
}
