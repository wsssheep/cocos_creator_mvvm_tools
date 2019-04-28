

const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseController extends cc.Component {

    // onLoad () {}

    public _model:any = {};

    start () {
     //   vm.$data.check = {selectA:true,selectB:true,selectC:true};
        

    }


    /**解析模型，遍历修改此模型的所有数值 */
    compileModel(){
        
    }


    sendEvent(type:string){
        let  event = new cc.Event.EventCustom(type,true);
        event.setUserData({}); //填写数据
        this.node.dispatchEvent(event);
    }

    update (dt) {

    }



}

