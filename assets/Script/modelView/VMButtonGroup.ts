import VMModify from "./VMModify";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property,menu } = cc._decorator;

enum PARAM_TYPE {
     CHILDREN_INDEX,
     CHILDREN_NAME
}

/**
 * 自动给所有带 button组件的 子对象绑定回调，回调传递的值为该子节点的名字
 * 可以考虑下,不继承 VMModify，这样拓展性更强些？
 * 暂时没想到什么合适的名字，观察一下吧
 * [可以使用 BhvGroupEvent 代替]
 */
@ccclass
@menu('ModelViewer/VM-ButtonGroup(按钮组)')
export default class VMButtonGroup extends VMModify {

    @property([cc.Component.EventHandler])
    touchEvents: cc.Component.EventHandler[] = [];

    paramType:PARAM_TYPE = PARAM_TYPE.CHILDREN_INDEX;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        super.onLoad();
        this.node.children.forEach(node => {
            if (node.getComponent(cc.Button)) {

                let comp = node.getComponent(cc.Button);
                this.touchEvents.forEach((event,index) => {
                    //克隆数据，每个节点获取的都是不同的回调
                    let hd = new cc.Component.EventHandler();//copy对象
                    hd.component = event.component;
                    hd.handler = event.handler;
                    hd.target = event.target;
                    if(this.paramType === PARAM_TYPE.CHILDREN_INDEX){
                        hd.customEventData = index.toString();
                    }else{
                        hd.customEventData = node.name;
                    }
                    comp.clickEvents.push(hd);
                })
                cc.log(comp);

            }
        });

    }

    start() {

    }

    // update (dt) {}
}
