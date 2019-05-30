import { ConfigItemStorage } from './../../userData/StorageModel';
import VMParent from "../../modelView/VMParent";
import CellShopItem from "../Cell/CellShopItem";



const {ccclass, property} = cc._decorator;

@ccclass
export default class VMItemShop extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    gridContent:cc.Node = null;

    @property(cc.Prefab)
    prefabCell:cc.Node = null;

 

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.updateCell(this.createShopList());
    }

    createShopList(){
        return [1,2,3,4,5,6,7,8,9,10,11,12,1,2];
    }

    updateCell(arr:any[]){
        this.gridContent.removeAllChildren(true);
        arr.forEach((v)=>{
            let itemId = v;
            let item = ConfigItemStorage.find(v=>v.id === itemId);
            if(item==null)return;
            let p = cc.instantiate(this.prefabCell);
            this.gridContent.addChild(p);
            p.getComponent(CellShopItem).init(item.id,item.price,item.pic,item.rank,item.type);
        })
    }

    // update (dt) {}
}
