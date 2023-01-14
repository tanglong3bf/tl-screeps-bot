import {createMarketController} from "@/modules/marketController";

export const marketApi = {
    sell(roomName: string, goodsType: MarketResourceConstant, count: number, price?: number) {
      if (createMarketController().tryToSell(roomName, goodsType, count, price))
      return '创建订单成功';
    },
}
