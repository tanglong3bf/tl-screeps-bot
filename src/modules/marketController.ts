export const createMarketController = () => {
  /**
   * 获取指定商品的出售单
   */
  const getSellOrders = (goodsType: MarketResourceConstant) => {
    return Game.market.getAllOrders({
      type: ORDER_SELL,
      resourceType: goodsType
    }).sort((a, b) => a.price - b.price).slice(0, 20);
  };
  /**
   * 获取指定商品的收购单
   */
  const getBuyOrders = (goodsType: MarketResourceConstant) => {
    return Game.market.getAllOrders({
      type: ORDER_BUY,
      resourceType: goodsType
    }).sort((a, b) => b.price - a.price).slice(0, 20);
  };
  /**
   * 用指定房间的term创建卖指定商品的订单
   */
  const tryToSell = (roomName: string, goodsType: MarketResourceConstant, count: number, price?: number) => {
    if (!Game.rooms[roomName].terminal) {
      console.log(`房间${roomName}不存在终端`);
      return false;
    }
    const sellOrders = getSellOrders(goodsType);
    const realPrice = price ? price : sellOrders[0].price - 0.01;
    return Game.market.createOrder({
      type: ORDER_SELL,
      resourceType: goodsType,
      price: realPrice,
      totalAmount: count,
      roomName: roomName
    }) == OK;
  }
  return { getSellOrders, getBuyOrders, tryToSell };
};
