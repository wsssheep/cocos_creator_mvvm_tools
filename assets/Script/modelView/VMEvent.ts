import VMBase from './VMBase';

//todo

// +普通 label 更新数据的情况,label.string = xxx;
// +frameIndex 插件，通过number 数值设置 BhvFrameIndex 来切换当前贴图
// +spriteFrame 直接替换贴图的情况 , 
//  读取本地路径 data.spriteFrame = $res:/pic/com1
//  读取网页路径 data.spriteFrame = $url:http:xxxxxxxxxx.png
// +特殊条件控制 

// 比较条件:,如果传入值 > /< />= /<= /== 某值时，执行的action类型

const {ccclass, property,executeInEditMode,menu} = cc._decorator;

enum WatchMode {
    ccLabel,
    ccRichText,
    ccSlider,
    ccProgressBar,
}

/**
 *  [VM-Event]
 * 提供  ViewModel 的相关基础功能,
 * 如果值发生变化将会调用对应的函数方法
 */
@ccclass
@executeInEditMode
@menu('ModelViewer/VM-EventCall(调用函数)')
export default class VMEvent extends VMBase {

    @property({
        displayName:'Watch Path',
    })
    watchPath:string = "";

    @property([cc.Component.EventHandler])
    changeEvents:cc.Component.EventHandler[] = [];


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    onEnable(){
        //this.node.on(this.eventName,this.receiveEvent,this,true);
        if(this.watchPath == '')return;
        this.VM.bindPath(this.watchPath,this.valueChanged,this);
    }

    onDisable(){
        if(this.watchPath == '')return;
        this.VM.unbindPath(this.watchPath,this.valueChanged,this);
    }

    
    valueChanged(newVar:any,oldVar:any,pathArr:any[]){
        if(Array.isArray(this.changeEvents)){
            this.changeEvents.forEach(v=>{
                v.emit([newVar,oldVar,pathArr]);
            })
        }
    }


    start () {

    }

    // update (dt) {}
}

