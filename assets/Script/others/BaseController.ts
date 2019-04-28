
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

enum WatchMode {
    ccLabel,
    ccSlider,
    ccProgressBar,
}

@ccclass
export default class BaseWatcher extends cc.Component {

    @property
    watchPath: string = '';

    @property({
        type:cc.Enum(WatchMode)
    })
    watchMode: WatchMode = WatchMode.ccLabel;

    oldValue:any = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    start () {

    }

    onEnable(){
        cc.director.on('VC:'+this.watchPath,this.valueChanged,this);
    }

    onDisable(){
        cc.director.off('VC:'+this.watchPath,this.valueChanged,this);
    }

    valueChanged(v){
        //this.node.getComponent(cc.Slider).progress = v;
        switch (this.watchMode) {
            case WatchMode.ccLabel:
                this.node.getComponent(cc.Label).string = v;
                break;
            case WatchMode.ccSlider:
                this.node.getComponent(cc.Slider).progress = v;
                break;
            case WatchMode.ccProgressBar:
                this.node.getComponent(cc.ProgressBar).progress = v;
                break;
        
            default:
                break;
        }
    }

    valueChanging(){
        switch (this.watchMode) {
            case WatchMode.ccSlider:
                this.node.getComponent(cc.Slider).progress;
                break;
            default:
                break;
        }
    }

    // update (dt) {}
}
