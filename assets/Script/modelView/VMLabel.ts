import { VM } from './JsonOb';

const {ccclass, property,menu,executeInEditMode} = cc._decorator;

const LABEL_TYPE = {
    CC_LABEL:'cc.Label',
    CC_RICH_TEXT:'cc.RichText',
    CC_EDIT_BOX:'cc.EditBox'
}

enum TEMPLATE_MODE {
    NONE,
    INDEX_NUMBER,
    GLOBAL_PATH
}


/**
 *  [VM-Label]
 *  专门处理 Label 相关 的组件，如 ccLabel,ccRichText,ccEditBox
 *  可以使用模板化的方式将数据写入,可以处理字符串格式等
 *  todo 加入i18n 模式,自动解析模板
 *  todo 加入stringFormat 可以解析转换常见的字符串格式
 */
@ccclass
@executeInEditMode
@menu('ModelViewer/VM-Label(文本VM)')
export default class VMLabel extends cc.Component {

    @property({
        visible:function(){
            return this.templateMode === TEMPLATE_MODE.NONE;
        }
    })
    watchPath:string = "";


    @property({
        //type:cc.Enum(LABEL_TYPE),
        readonly:true
    })
    private labelType:string = LABEL_TYPE.CC_LABEL;

    @property({
        type:cc.Enum(TEMPLATE_MODE),
        tooltip:'是否启用模板代码,只能在运行时之前设置,\n将会动态解析模板语法 {{name}},并且自动设置监听的路径'
    })
    private templateMode:TEMPLATE_MODE = TEMPLATE_MODE.NONE;



    //按照匹配参数顺序保存的 path 数组
    @property({
        type:[cc.String],
        visible:function(){return this.templateMode === TEMPLATE_MODE.INDEX_NUMBER}
    })
    private templatePathArr:string[] = [];

    //按照匹配参数顺序保存的 值的数组
    private templateValueArr:any[] = [];

    originText:string = null;

    // LIFE-CYCLE CALLBACKS:

    onRestore(){
        this.checkLabel();
    }

    onLoad () {
        this.checkLabel();
        if(!CC_EDITOR){
            if(this.templateMode !== TEMPLATE_MODE.NONE){
                this.originText = this.getLabelValue();
                this.parseTemplate();
            }
            this.onValueInit();
        }

    }

    onEnable(){
        if(this.templateMode !== TEMPLATE_MODE.NONE){
            this.setMultPathEvent(true);
            return;
        }
        if(this.watchPath == '')return;
        VM.bindPath(this.watchPath,this.onValueChanged,this);
    }

    onDisable(){
        if(this.templateMode !== TEMPLATE_MODE.NONE){
            this.setMultPathEvent(false);
            return;
        }
        if(this.watchPath == '')return;
        VM.unbindPath(this.watchPath,this.onValueChanged,this);
    }

    //解析模板
    parseTemplate(){
        let regexAll = /\{\{(.+?)\}\}/g; //匹配： 所有的{{value}}
        let regex = /\{\{(.+?)\}\}/;//匹配： {{value}} 中的 value
        let res = this.originText.match(regexAll);//匹配结果数组
        if(res==null)return;
        let isIndexMode = this.templateMode == TEMPLATE_MODE.INDEX_NUMBER;
      
        for (let i = 0; i < res.length; i++) {
            const e = res[i];
            let arr = e.match(regex);
            let pathName =  arr[1];
            if(isIndexMode){
                let number = parseInt(pathName)||0;
                let realPath = this.templatePathArr[number];
                this.templateValueArr[i] = VM.getValue(realPath,'?');
            }else{
                this.templatePathArr[i] = pathName; //缓存path 路径
                this.templateValueArr[i] = VM.getValue(pathName,'?'); //初始化通过路径获取的值
            }
        }

        //监听对应的数值变化
        this.setMultPathEvent(true);


    }

    setMultPathEvent(enabled:boolean = true){
        if(CC_EDITOR)return;
        let arr = this.templatePathArr;
        for (let i = 0; i < arr.length; i++) {
            const path = arr[i];
            if(enabled){
                VM.bindPath(path,this.onValueChanged,this);
            }else{
                VM.unbindPath(path,this.onValueChanged,this);
            }
        }

    }

    /**获取解析字符串模板后得到的值 */
    getReplaceText(){
        let regexAll = /\{\{(.+?)\}\}/g; //匹配： 所有的{{value}}
        let regex = /\{\{(.+?)\}\}/;//匹配： {{value}} 中的 value
        let res = this.originText.match(regexAll);//匹配结果数组 [{{value}}，{{value}}，{{value}}]
        if(res == null)return;//未匹配到文本
        let str = this.originText;//原始字符串模板 "name:{{0}}"
        let isIndexMode = this.templateMode == TEMPLATE_MODE.INDEX_NUMBER;

        for (let i = 0; i < res.length; i++) {
            const e = res[i];
            let getValue;
            if(isIndexMode){
               let arr = e.match(regex); //匹配到的数组 [{{value}}, value]
               let indexNum = parseInt(arr[1]||'0')||0; //取出数组的 value 元素 转换成整数
               getValue = this.templateValueArr[indexNum];
               str =  str.replace(e,getValue);//从路径缓存值获取数据
            }else{
                getValue =  this.templateValueArr[i];//从路径缓存值获取数据
                str =  str.replace(e,getValue);
            }
        }
        return str;
    }

    onValueInit(){
        //更新信息
        if(this.templateMode === TEMPLATE_MODE.NONE){
            this.setLabelValue(VM.getValue(this.watchPath)); //
        }else{
            this.setLabelValue(this.getReplaceText()); // 重新解析
        }
    }

    /**监听数据发生了变动的情况 */
    onValueChanged(n,o,pathArr:string[]){
        if(this.templateMode === TEMPLATE_MODE.NONE){
            this.setLabelValue(n);

        }else{
            let path = pathArr.join('.');
            //寻找缓存位置
            let index =  this.templatePathArr.findIndex(v=>{
                return v === path;
            });

            if(index >= 0){ 
                //如果是所属的路径，就可以替换文本了
                this.templateValueArr[index] = n; //缓存值
                this.setLabelValue(this.getReplaceText()); // 重新解析文本
            }

        }
 
    }

    setLabelValue(value){
        this.getComponent(this.labelType).string = value;
    }

    getLabelValue():string{
        return this.getComponent(this.labelType).string;
    }
    
    

    checkLabel(){
        let checkArray = [
            'cc.Label',
            'cc.RichText',
            'cc.EditBox',
        ];

        for (let i = 0; i < checkArray.length; i++) {
            const e = checkArray[i];
            let comp = this.node.getComponent(e);
            if(comp){
                this.labelType = e;
                return true;
            }
            
        }

        cc.error('没有挂载任何label组件');

        return false;

    }

    // update (dt) {}
}
