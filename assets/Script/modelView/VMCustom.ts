import VMBase from './VMBase';

const {ccclass, property,executeInEditMode,menu} = cc._decorator;

/**自动检查识别的数组,你可以准备自己的组件放上去自动识别 */
const COMP_ARRAY_CHECK= [
    ['BhvRollNumber','targetValue',false],
    //组件名、默认属性、controller值
    ['cc.Label','string',false],
    ['cc.RichText','string',false],
    ['cc.EditBox','string',true],
    ['cc.Slider','progress',true],
    ['cc.ProgressBar','progress',false],
    ['cc.Toggle','isChecked',true]
];

/**
 * [VM-Custom]
 * 自定义数值监听, 可以快速对该节点上任意一个组件上的属性进行双向绑定
 */
@ccclass
@executeInEditMode
@menu('ModelViewer/VM-Custom (自定义VM)')
export default class VMCustom extends VMBase {

    @property
    watchPath:string = "";

    @property
    debug:boolean = false;

    @property({
        tooltip:'激活controller,以开启双向绑定，否则只能接收消息'
    })
    controller:boolean  = false;

    @property({
        tooltip:'绑定组件的名字'
    })
    componentName:string  = "";

    @property({
        tooltip:'组件上需要监听的属性'
    })
    componentProperty:string  = "";



    @property({
        tooltip:'刷新间隔频率(只影响脏检查的频率)',
        step:0.01,
        range:[0,1],
        visible:function(){return this.controller === true}
    })
    refreshRate:number  = 0.1;

    //计时器
    private _timer = 0;

    /**监听的组件对象 */
    private _watchComponent:any = null;

    /**是否能监听组件的数据 */
    private _canWatchComponent:boolean = false;

    /**检查的值 */
    private _oldValue:any = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();
        this.checkEditorComponent();//编辑器检查
        //只在运行时检查组件是否缺失可用
        if(!CC_EDITOR){
            this._watchComponent = this.node.getComponent(this.componentName);
            this.checkComponentState();
        }
    }

    onRestore(){
        this.checkEditorComponent();
    }

    //挂在对应节点后，自动获取组件属性和名字
    checkEditorComponent(){
        if(CC_EDITOR){
            let checkArray = COMP_ARRAY_CHECK;

            //检查是否是默认数组里的值，如果是才会被编辑器自动改变
            // let checkDef = checkArray.find(v=>{
            //     return v[0] === this.componentName
            // })
            // if(checkDef == null)return;

            this.controller = false;
            for (let i = 0; i < checkArray.length; i++) {
                const params = checkArray[i];
                let comp = this.node.getComponent(params[0] as string);
                if(comp){

                    if(this.componentName =='')this.componentName = params[0] as string;
                    if(this.componentProperty =='')this.componentProperty = params[1] as string;
                    if(params[2] !== null)this.controller =  params[2] as boolean;

                    break;
                }
                
            }
        }


    }

    start () {
        //从 watch 的路径中获取一个初始值
        if(CC_EDITOR)return;
        this.setComponentValue(this.VM.getValue(this.watchPath));
    }

    onEnable(){
        if(this.watchPath == '')return;
       this.VM.bindPath(this.watchPath,this.onValueChanged,this);
    }

    onDisable(){
        if(this.watchPath == '')return;
       this.VM.unbindPath(this.watchPath,this.onValueChanged,this);
    }

    checkComponentState(){
        this._canWatchComponent = false;
        if(!this._watchComponent){console.error('未设置需要监听的组件');return;}
        if(!this.componentProperty){console.error('未设置需要监听的组件 的属性');return;}
        if( this.componentProperty in this._watchComponent === false ){console.error('需要监听的组件的属性不存在');return;}
        this._canWatchComponent = true;
  
    }

    getComponentValue(){
        return this._watchComponent[this.componentProperty];
      
    }

    setComponentValue(value:any){
        //如果遇到cc.Toggle 组件就调用上面的方法解决
        if(this.componentName == "cc.Toggle"){
            if(value == true){
                this.node.getComponent(cc.Toggle).check();
            }
            if(value == false){
                this.node.getComponent(cc.Toggle).uncheck();
            }
        }else{
            this._watchComponent[this.componentProperty] = value;
        }
    }

    onValueChanged(n,o,path){
        if(this.debug)console.log(n,o,path.join('.'));
        this.setComponentValue(n);
    }

    update (dt) {
        //脏检查（组件是否存在，是否被激活）
        if(CC_EDITOR == true)return;
        if(!this.controller)return;
        if(!this._canWatchComponent||this._canWatchComponent['enabled'] === false)return;

        //刷新频率检查
        this._timer+=dt;
        if(this._timer < this.refreshRate)return;
        this._timer = 0;

        if(this._oldValue === this.getComponentValue())return;
         this._oldValue = this.getComponentValue();
         this.VM.setValue(this.watchPath,this._oldValue);
  
    }
}
