import { VM } from './JsonOb';
import VMBase from './VMBase';

const {ccclass, property,menu} = cc._decorator;

/**比较条件 */
enum CONDITION{
    "==",
    "!=",
    ">",
    ">=",
    "<",
    "<=",
}

enum ACTION {
    NODE_ACTIVE, //满足条件 的 节点激活 ，不满足的不激活
    NODE_VISIBLE, //满足条件 的节点显示，不满足的不显示
    NODE_OPACITY,  //满足条件的节点改变不透明度，不满足的还原255
    NODE_COLOR, //满足条件的节点改变颜色，不满足的恢复白色
}


/**
 * [VM-State]
 * 监听数值状态,根据数值条件设置节点是否激活
 */
@ccclass
@menu('ModelViewer/VM-State (VM状态控制)')
export default class VMState extends VMBase {

    @property
    watchPath:string = "";

    @property({
        type:cc.Enum(CONDITION)
    })
    condition:CONDITION = CONDITION["=="];
    
    @property({
        displayName:'Value: b',
        //visible:function(){return this.condition >=2 }
    })
    value:number = 0;


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
        type:[cc.Node],
        tooltip:'需要执行条件的节点，如果不填写则默认会执行本节点以及本节点的所有子节点 的状态'
    })
    watchNodes:cc.Node[] = [];


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();
        //如果数组里没有监听值，那么默认把所有子节点给监听了
        if(this.watchNodes.length == 0){
            if(this.valueAction !== ACTION.NODE_ACTIVE){
                this.watchNodes.push(this.node);
            }
            this.watchNodes = this.watchNodes.concat(this.node.children);
        }
   
        this.onValueInit();
    }

    start () {
        
    }

    onEnable(){
        if(this.watchPath == '')return;
       VM.bindPath(this.watchPath,this.onValueChanged,this);
    }

    onDisable(){
        if(this.watchPath == '')return;
       VM.unbindPath(this.watchPath,this.onValueChanged,this);
    }

    //当值初始化时
    private onValueInit(){
        let value =  VM.getValue(this.watchPath);
        let check = this.conditionCheck(value,this.value);
        this.setNodesStates(check);
    }

    //当值被改变时
    private onValueChanged(newVar:any,oldVar:any,pathArr:any[]){

        let check = this.conditionCheck(newVar,this.value);
        this.setNodesStates(check);

    }

    //更新节点的状态
    private setNodesStates(checkState?:boolean){
        let nodes = this.watchNodes;
        let check = checkState;
        nodes.forEach((node)=>{
            let n = this.valueAction;
            let a = ACTION;
            switch (n) {
                case a.NODE_ACTIVE: node.active = check?true:false;  break; 
                case a.NODE_VISIBLE: node.opacity = check?255:0;  break;
                case a.NODE_COLOR: node.color = check?this.valueActionColor:cc.color(255,255,255); break;
                case a.NODE_OPACITY: node.opacity = check?this.valueActionOpacity:255;  break;
            
                default:
                    break;
            }
        })
    }

    /**条件检查 */
    private conditionCheck(a,b):boolean{
        let cod = CONDITION;
        switch (this.condition) {
            case cod["=="]:
                if(a == b)return true;
                break;
            case cod["!="]:
                if(a != b)return true;
                break;
            case cod["<"]:
                if(a < b)return true;
                break;
            case cod[">"]:
                if(a > b)return true;
                break;
            case cod[">="]:
                if(a >= b)return true;
                break;
            case cod["<"]:
                if(a < b)return true;
                break;
            case cod["<="]:
                if(a <= b)return true;
                break;
        
            default:
                break;
        }

        return false;
    }


    // update (dt) {}
}
