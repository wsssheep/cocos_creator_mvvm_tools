import { PlayerItemPackage } from './../../userData/StorageModel';
import VMParent from "../../modelView/VMParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class CellShopItem extends VMParent {

   data = {
    price:1280,
    buy:false,
    item:{
        id:0,
        pic:4,
        rank:3,
        type:0,
    }
   }

   /**初始化设置商店内容 */
   init(itemId,price,pic,rank,type){
        this.data.price = price;
        this.data.item.id = itemId;
        this.data.item.pic = pic;
        this.data.item.rank = rank;  
        this.data.item.type = type;
        this.onUpdateGoldCheck(this.VM.getValue('player.gold'));
   }

   onEnable(){
       //通过脚本监听数值变化
       this.VM.bindPath('player.gold',this.onUpdateGoldCheck,this);
   }

   onDisable(){
       //记得移除监听变化
       this.VM.unbindPath('player.gold',this.onUpdateGoldCheck,this);
   }

   /**如果金钱更新了怎么处理 */
   onUpdateGoldCheck(n){
       //注意不能使用下面直接比较的方式,必须从回调里设置值，因为此时的 VM.getValue() 还是旧值
       //this.VM.getValue('player.gold')>this.data.price
        if(n>this.data.price){
            this.data.buy = false;
        }else{
            this.data.buy = true;
        }
   }

   onButtonBuy(){
       //测试用道具添加
       PlayerItemPackage.push({
           //背包索引编号-唯一ID，用时间+ 道具 ID 作为唯一ID, 当然这个做法不对，你需要自己构建个ID系统
            id:new Date().getTime()+this.data.item.id,
            itemId:this.data.item.id, //对应的道具id
            type:this.data.item.type, //道具分类('0-道具','1-武器','2-服装','3-首饰')
            equip:0, //是否被装备（背包用）
            count:1, //道具的数量
            getTime:new Date().getTime()  //获取的时间
       })

       //删除数值
       this.VM.addValue('player.gold',-this.data.price);
       this.node.destroy();
   }


    // update (dt) {}
}
