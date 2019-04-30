import VMBase from "./VMBase";
import VMCustom from "./VMCustom";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property,menu} = cc._decorator;


// const COMP_ARRAY_CHECK= [
//     //组件名、默认属性、controller值
//     ['cc.Slider','progress',true],
//     ['cc.ProgressBar','progress',false],
// ];

@ccclass
@menu('ModelViewer/VM-Progress (VM-进度条)')
export default class VMProgress extends VMCustom {

    @property({
        visible:false,
        override: true
    })
    watchPath:string = '';
  
    @property
    minValuePath:string = ''

    @property
    maxValuePath:string = ''


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.templateMode = true;
        this.watchPathArr = [this.minValuePath,this.maxValuePath];
        super.onLoad();
    }

    start () {
        if (CC_EDITOR) return;
        this.onValueInit();
    }

    onValueInit() {
        let max = this.watchPathArr.length;
        for (let i = 0; i < max; i++) {
            this.templateValueArr[i] = this.VM.getValue(this.watchPathArr[i]);
        }

        this.setComponentValue(this.templateValueArr[0]/this.templateValueArr[1]);
    }

    onValueController(n,o){
        let value = Math.round( n * this.templateValueArr[1] );
        if(Number.isNaN(value))value = 0;
        this.VM.setValue(this.watchPathArr[0],value);
    }

    /**初始化改变数据 */
    onValueChanged(n, o, pathArr: string[]) {
        if(this.templateMode === false)return;

 
        let path = pathArr.join('.');
        //寻找缓存位置
        let index = this.watchPathArr.findIndex(v => v === path);
        if (index >= 0) {
            //如果是所属的路径，就可以替换文本了
            this.templateValueArr[index] = n; //缓存值
        }

         let value = this.templateValueArr[0]/this.templateValueArr[1];
         if(value>1)value = 1;
         if(value<0||Number.isNaN(value))value = 0;
         
        this.setComponentValue(value);
    }

  
}
