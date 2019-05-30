import { VM } from './../../modelView/ViewModel';

import { PlayerItemPackage, ConfigItemStorage } from './../../userData/StorageModel';
import VMParent from "../../modelView/VMParent";
import CellItem from '../Cell/CellItem';


const {ccclass, property} = cc._decorator;

@ccclass
export default class VMItemBag extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    gridContent:cc.Node = null;

    @property(cc.Prefab)
    prefabCell:cc.Node = null;

    data:any[] = [];

    onEnable(){
        //自动刷新
        this.onChangeSortType(VM.getValue('ui.bag.sort'));
    }

    updateCell(arr:any[]){
        this.gridContent.removeAllChildren(true);
        arr.forEach((v)=>{
            let itemId = v.itemId;
            let item = ConfigItemStorage.find(v=>v.id === itemId);
            if(item==null)return;
            let p = cc.instantiate(this.prefabCell);
            this.gridContent.addChild(p);
            p.getComponent(CellItem).init(v.id,item.pic,v.equip,item.rank);
        })
    }

    //变更排序分类
    onChangeSortType(n){
        //过滤、排序，得到新的数组数据
        // n = 0- 全部 1-  武器 2-服装 3-道具 4-装饰 -5 最新
        // type =  0-  武器 1-服装 2-道具 3-装饰

        let res = PlayerItemPackage.filter(v=>{
            return (n===5||n===0)?true:(v.type+1) == n
        });

        if(n===5){
            res.sort((a,b)=>a.getTime-b.getTime);
        }else{
            res.sort((a,b)=>a.itemId-b.itemId);
        }

        this.updateCell(res);
    }



    // update (dt) {}
}
