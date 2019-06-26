
import { VM } from './ViewModel';
import VMBase from './VMBase';

const {ccclass, property,menu,help} = cc._decorator;

/**比较条件 */
enum CONDITION{
    "==", //正常计算，比较 等于
    "!=", //正常计算，比较 不等于
    ">",  //正常计算，比较>
    ">=", //正常计算，比较>=
    "<",  //正常计算，比较<
    "<=", // 正常计算，比较>=
    "range" //计算在范围内
}


enum ACTION {
    NODE_ACTIVE, //满足条件 的 节点激活 ，不满足的不激活
    NODE_VISIBLE, //满足条件 的节点显示，不满足的不显示
    NODE_OPACITY,  //满足条件的节点改变不透明度，不满足的还原255
    NODE_COLOR, //满足条件的节点改变颜色，不满足的恢复白色
    COMPONENT_CUSTOM, //自定义控制组件模式
}


enum CHILD_MODE_TYPE {
    NODE_INDEX,
    NODE_NAME
}


/**
 * [VM-State]
 * 监听数值状态,根据数值条件设置节点是否激活
 */
@ccclass
@menu('ModelViewer/VM-State (VM状态控制)')
@help('https://github.com/wsssheep/cocos_creator_mvvm_tools/blob/master/docs/VMState.md')
export default class VMState extends VMBase {

    @property
    watchPath:string = "";

    @property({
        tooltip:'遍历子节点,根据子节点的名字或名字转换为值，判断值满足条件 来激活'
    })
    foreachChildMode:boolean = false;

    @property({
        type:cc.Enum(CONDITION),
    })
    condition:CONDITION = CONDITION["=="];

    @property({
        type:cc.Enum(CHILD_MODE_TYPE),
        tooltip:'遍历子节点,根据子节点的名字转换为值，判断值满足条件 来激活',
        visible:function(){return this.foreachChildMode === true}
    })
    foreachChildType:CHILD_MODE_TYPE = CHILD_MODE_TYPE.NODE_INDEX;
    
    @property({
        displayName:'Value: a',
        visible:function(){return this.foreachChildMode === false }
    })
    valueA:number = 0;

    @property({
        displayName:'Value: b',
        visible:function(){return this.foreachChildMode === false && this.condition ===  CONDITION.range }
    })
    valueB:number = 0;


    @property({
        type:cc.Enum(ACTION),
        tooltip:'一旦满足条件就对节点执行操作'
    })
    valueAction:ACTION =  ACTION.NODE_ACTIVE;

    @property({
        visible:function(){return this.valueAction === ACTION.NODE_OPACITY},
        range:[0,255],
        type:cc.Integer,
        displayName:'Action Opacity'
    })
    valueActionOpacity:number = 0;

    @property({
        visible:function(){return this.valueAction === ACTION.NODE_COLOR},
        displayName:'Action Color'
    })
    valueActionColor:cc.Color = cc.color(155,155,155);


    @property({
        visible:function(){return this.valueAction === ACTION.COMPONENT_CUSTOM},
        displayName:'Component Name'
    })
    valueComponentName:string = '';

    @property({
        visible:function(){return this.valueAction === ACTION.COMPONENT_CUSTOM},
        displayName:'Component Property'
    })
    valueComponentProperty:string = '';

    @property({
        visible:function(){return this.valueAction === ACTION.COMPONENT_CUSTOM},
        displayName:'Default Value'
    })
    valueComponentDefaultValue:string = '';

    @property({
        visible:function(){return this.valueAction === ACTION.COMPONENT_CUSTOM},
        displayName:'Action Value'
    })
    valueComponentActionValue:string  = '';

    @property({
        type:[cc.Node],
        tooltip:'需要执行条件的节点，如果不填写则默认会执行本节点以及本节点的所有子节点 的状态'
    })
    watchNodes:cc.Node[] = [];


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();
        //如果数组里没有监听值，那么默认把所有子节点给监听了
        if(this.watchNodes.length == 0){
            if(this.valueAction !== ACTION.NODE_ACTIVE && this.foreachChildMode === false ){
                this.watchNodes.push(this.node);
            }
            this.watchNodes = this.watchNodes.concat(this.node.children);
        }
   
        
    }

    start () {
        if(this.enabled){
            this.onValueInit();
        }
    }

    //当值初始化时
    protected onValueInit(){
        let value =  VM.getValue(this.watchPath);
        this.checkNodeFromValue(value);
    }

    //当值被改变时
    protected onValueChanged(newVar:any,oldVar:any,pathArr:any[]){
        this.checkNodeFromValue(newVar);

    }

    //检查节点值更新
    private checkNodeFromValue(value){
        if(this.foreachChildMode){
            this.watchNodes.forEach((node,index)=>{
                let v  = (this.foreachChildType === CHILD_MODE_TYPE.NODE_INDEX)?index:node.name;
                let check =  this.conditionCheck(value,v);
                 //cc.log('遍历模式',value,node.name,check);
                this.setNodeState(node,check);
            })
        }else{
            let check = this.conditionCheck(value,this.valueA,this.valueB);
            this.setNodesStates(check);
        }
    }

    //更新 多个节点 的 状态
    private setNodesStates(checkState?:boolean){
        let nodes = this.watchNodes;
        let check = checkState;
        nodes.forEach((node)=>{
            this.setNodeState(node,check);
        })
    }

    /**更新单个节点的状态 */
    private setNodeState(node:cc.Node,checkState?:boolean){
        let n = this.valueAction;
        let check = checkState;
        let a = ACTION;
        switch (n) {
            case a.NODE_ACTIVE: node.active = check?true:false;  break; 
            case a.NODE_VISIBLE: node.opacity = check?255:0;  break;
            case a.NODE_COLOR: node.color = check?this.valueActionColor:cc.color(255,255,255); break;
            case a.NODE_OPACITY: node.opacity = check?this.valueActionOpacity:255;  break;

            case a.COMPONENT_CUSTOM:
                let comp =  node.getComponent(this.valueComponentName);
                if(comp == null)return;
                if(this.valueComponentProperty in comp){
                    comp[this.valueComponentProperty] = check?this.valueComponentActionValue:this.valueComponentDefaultValue;
                }
            break;
        
            default:
                break;
        }
    }


    /**条件检查 */
    private conditionCheck(v,a,b?):boolean{
        let cod = CONDITION;
        switch (this.condition) {
            case cod["=="]:
                if(v == a)return true;
                break;
            case cod["!="]:
                if(v != a)return true;
                break;
            case cod["<"]:
                if(v < a)return true;
                break;
            case cod[">"]:
                if(v > a)return true;
                break;
            case cod[">="]:
                if(v >= a)return true;
                break;
            case cod["<"]:
                if(v < a)return true;
                break;
            case cod["<="]:
                if(v <= a)return true;
                break;
            case cod["range"]:
                if(v >=a && v<=b)return true;
                break;
        
            default:
                break;
        }

        return false;
    }


    // update (dt) {}
}
