import { VM } from './JsonOb';

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
    NODE_ACTIVE, //节点的激活状态 （会影响到容器计算）
    NODE_VISIBLE, //节点的显示和隐藏（只是不透明度）
    NODE_FADE,  //节点的显示和隐藏,包含渐隐的过渡动画
    NODE_COLOR, //更改节点的颜色（满足状态/不满足状态）
}


/**
 * [VM-State]
 * 监听数值状态,根据数值条件设置节点是否激活
 */
@ccclass
@menu('ModelViewer/VM-State (VM状态控制)')
export default class VMState extends cc.Component {

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
        type:[cc.Node],
        tooltip:'需要执行条件的节点，如果不填写则默认会执行本节点下的所有子节点'
    })
    watchNodes:cc.Node[] = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //如果数组里没有监听值，那么默认把所有子节点给监听了
        if(this.watchNodes.length == 0){
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
