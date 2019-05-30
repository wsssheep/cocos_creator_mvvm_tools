import { PlayerItemPackage } from './../../userData/StorageModel';
import VMParent from "../../modelView/VMParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    data:any[] = [];
    // onLoad () {}

    //变更排序分类
    onChangeSortType(n,o,arr,custom){
        //过滤、排序，得到新的数组数据
        let res = PlayerItemPackage.filter(v=>v.type == n).sort((a,b)=>a.getTime-b.getTime);
        console.log('排序结果:',res);
    }

    start () {

    }


    // update (dt) {}
}
