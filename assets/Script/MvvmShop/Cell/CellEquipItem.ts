import { PlayerItemPackage, ConfigItemStorage } from './../../userData/StorageModel';

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;



interface CellData {
    type:number; // 装备孔类型（0-武器 1-服装 2- 装饰）
    rank:number //品质星级 （通用）
    pic:number //图片编号 （通用）
    equip:0|1 //是否被装备（背包用）
}


/**
 * 不建议在 Cell 使用 MVVM 方式显示
 */
@ccclass
export default class CellEquipItem extends cc.Component {


    /**玩家的道具在库存中的编号数据（和数组数据无关 */
    private _index : number = -1;
    public get index() : number {
        return this._index;
    }
    public set index(v : number) {
        if(v<=-1) v =-1;
           
        let res =  this.getData(v);
        if(res == true){
            this._index = v; 
        }
        this.refreshCell();
    }
    

    data:CellData = {
        type:0, //装备孔的类型
        rank:0, //品质星级 （通用）
        pic:0,  //图片编号 （通用）
        equip:0 //是否被装备（背包用）
    }

    // onLoad () {}

    start () {
        this.index = -1;
    }

    /**
     * 细胞显示模式，不同模式显示的内容格式不同
     * @param type 0-EQUIP 1-SHOP 2-BAG 
     */
    init(){

    }

    //获取数据
    getData(index:number):boolean{

        let player =  PlayerItemPackage.find(v=> v.id == index);
        if(player ==null)return false;
        let item = ConfigItemStorage.find(v=>v.id == player.itemId );
        if(item == null)return false;

        this.data = {
            type:item.type, //装备孔的类型
            rank:item.rank, //品质星级 （通用）
            pic:item.pic,  //图片编号 （通用）
            equip:player.equip as 0 //是否被装备（背包用）
        }
        return true;
    }

    //刷新Cell 内容
    refreshCell(){ 
        let invisible = this._index === -1;

        let equip = this.node.getChildByName('equip');
        equip.active = this.data.equip?true:false;

        let icon =  this.node.getChildByName('icon_test');
        icon.active =  invisible?false:true;

        let frame  = icon.getComponent('BhvFrameIndex');
        frame.index = this.data.pic;

        let star_list = this.node.getChildByName('star_list');
        star_list.active = invisible?false:true

        let list = star_list.children;
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            if(i>this.data.rank){
                element.active = false;
            }else{
                element.active = true;
            }
            
        }
    }

    // update (dt) {}
}
