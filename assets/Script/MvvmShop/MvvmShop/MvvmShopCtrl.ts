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

@ccclass
export default class MvvmShopCtrl extends cc.Component {

    @property([cc.Prefab])
    prefabs: cc.Prefab[] = [];


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    onCreateWindowId(e,data){
        let index =  parseInt(data);
        if(index === null)return;

        let node = cc.instantiate(this.prefabs[index]);
        this.node.addChild(node);
    }

    // update (dt) {}
}
