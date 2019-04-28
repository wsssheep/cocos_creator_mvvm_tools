import { VM } from './../modelView/JsonOb';
import VMParent from "../modelView/VMParent";

const {ccclass, property} = cc._decorator;

class ModelRename {
    name: string = '';
}

let rename = new ModelRename();
VM.add(rename,'rename')

@ccclass
export default class VMRename extends VMParent {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init();
    }

    init(){

    }

    onRename(){
        if(rename.name !== ''){
            VM.setValue('player.name',rename.name);
        }
        this.node.destroy();
    }

    onCancel(){
        this.node.destroy();
    }

    start () {

    }

    // update (dt) {}
}
