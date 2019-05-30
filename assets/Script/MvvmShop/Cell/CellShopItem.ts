import VMParent from "../../modelView/VMParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class CellShopItem extends VMParent {

   data = {
    price:1280,
    buy:false,
    item:{
        id:4,
        rank:3
    }
   }

   /**初始化设置商店内容 */
   init(){
    
   }


    // update (dt) {}
}
