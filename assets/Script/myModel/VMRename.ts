import VMParent from '../modelView/VMParent';


const {ccclass, property} = cc._decorator;


@ccclass
export default class VMRename extends VMParent {

    // LIFE-CYCLE CALLBACKS:

    tag:string = 'rename';

    //绑定的数据模型
    data = {
        name:'',
        find:'test',
        cost:64
    }

    onBind(){

    }
    
    start () {
        
        this.data.name = this.VM.getValue('player.name',"?");
    }

    onRename(){
        if(this.data.name !== ''){
            this.VM.setValue('player.name',this.data.name);
        }
        this.node.destroy();
    }

    onCancel(){
        this.node.destroy();
    }

    // update (dt) {}
}

