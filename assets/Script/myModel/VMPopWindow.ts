import { GlobalData } from './../modelView/UserModel';
import { VM } from './../modelView/JsonOb';
import VMParent from '../modelView/VMParent';

const {ccclass, property} = cc._decorator;

class ModelShopShip {
    buy = 0;
    owns = 15;
    progress = 0;
    cost = 0;
    max = 0;
    item = {
        name: "神级物品",
        price: 150,
        max: 99
    }

}

let ui_shop: ModelShopShip = new ModelShopShip();
VM.add(ui_shop, 'shop');     //定义全局tag

/**
 * 弹窗VM
 * 将逻辑判断放在这里
 */
@ccclass
export default class VMPopWindow extends VMParent {

    parentPath = 'shop';
    private shop:ModelShopShip = VM.get<ModelShopShip>('shop').$data;
    private global:GlobalData = VM.get<GlobalData>('game').$data;

    onLoad(){
        this.init();
    }

    init(){
        this.shop.buy = 0;
        this.shop.item.name = '名字不错';
        this.shop.item.price = Math.floor( Math.random()*1000 );
        this.shop.cost = 0;

        //最大能买的数量
        let countMax = this.shop.item.max - this.shop.owns; 
        let valueMax =  Math.floor(this.global.diamond/this.shop.item.price);
        this.shop.max = Math.min(countMax,valueMax);
    }

    start () {
        
    }

    getResult(){
        this.global.diamond -= this.shop.cost;
        this.shop.owns += this.shop.buy;
        this.node.destroy();
    }

    close(){
        this.node.destroy();
    }

    onDragProgress(){
        this.shop.buy = Math.round(this.shop.progress * this.shop.max);
        this.shop.cost = Math.floor(this.shop.buy * this.shop.item.price);
    }

    onAddItem(e,data:string){
        this.shop.buy += parseInt(data);
        if(this.shop.buy<0) this.shop.buy = 0;
        //限制取值范围，不超过 diamond 数量
        if(this.shop.buy >  this.shop.max ){
            this.shop.buy = this.shop.max;
        }
        
        let  value = this.shop.buy/this.shop.max
        this.shop.progress = Number.isNaN(value)?0:value;
        this.shop.cost = Math.floor(this.shop.buy * this.shop.item.price);
    }
    

}
