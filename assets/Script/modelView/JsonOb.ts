
/**
 * 实现动态绑定的核心部分，
 * 每次修改属性值，都会调用对应函数，并且获取值的路径
 */

const OP = Object.prototype;
const types = {
    obj: '[object Object]',
    array: '[object Array]'
}
const OAM = ['push', 'pop', 'shift', 'unshift', 'short', 'reverse', 'splice'];
const VM_EMIT_HEAD = 'VC:';
const DEBUG_SHOW_PATH = false;

function setValueFromPath(obj:any,path: string, value: any, tag:string = '') {
    let props = path.split('.');
    for (let i = 0; i < props.length; i++) {
        const propName = props[i];
        if (propName in obj === false) { console.error('['+propName + '] not find in ' +tag+'.'+ path); break; }
        if (i == props.length - 1) {
            obj[propName] = value;
        } else {
            obj = obj[propName];
        }
    }

}

//获取路径的值
function getValueFromPath(obj:any,path: string,def?:any, tag:string = ''):any {
    let props = path.split('.');
    for (let i = 0; i < props.length; i++) {
        const propName = props[i];
        if ((propName in obj === false)) { console.error('['+propName + '] not find in '+tag+'.'+ path); return def; }
        obj = obj[propName];
    }
    if(obj === null||typeof obj === "undefined")obj = def;//如果g == null 则返回一个默认值
    return obj;

}

/**
 * 实现属性拦截的类
 */
class JsonOb<T> {
    constructor(obj:T, callback: (newVal: any, oldVal: any, pathArray: string[]) => void) {
        if (OP.toString.call(obj) !== types.obj && OP.toString.call(obj) !== types.array) {
            console.error('请传入一个对象或数组');
        }
        this._callback = callback;
        this.observe(obj);
    }

    private _callback;
    /**对象属性劫持 */
    private observe<T>(obj: T, path?) {

        if (OP.toString.call(obj) === types.array) {
            this.overrideArrayProto(obj, path);
        }

        Object.keys(obj).forEach((key) => {
            let self = this;
            let oldVal = obj[key];
            let pathArray = path && path.slice();
            if (pathArray) {
                pathArray.push(key);
            }
            else {
                pathArray = [key];
            }
            Object.defineProperty(obj, key, {
                get: function () {
                    return oldVal;
                },
                set: function (newVal) {
                    //console.log(newVal);
                    if (oldVal !== newVal) {
                        if (OP.toString.call(newVal) === '[object Object]') {
                            self.observe(newVal, pathArray);
                        }
                        self._callback(newVal, oldVal, pathArray)
                        oldVal = newVal
                    }
                }
            })

            if (OP.toString.call(obj[key]) === types.obj || OP.toString.call(obj[key]) === types.array) {
                this.observe(obj[key], pathArray)
            }

        }, this)
    }

    /**
     * 对数组类型进行动态绑定
     * @param array 
     * @param path 
     */
    private overrideArrayProto(array: any, path) {
        // 保存原始 Array 原型  
        var originalProto = Array.prototype;
        // 通过 Object.create 方法创建一个对象，该对象的原型是Array.prototype  
        var overrideProto = Object.create(Array.prototype);
        var self = this;
        var result;

        // 遍历要重写的数组方法  
        OAM.forEach((method) => {
            Object.defineProperty(overrideProto, method, {
                value: function () {
                    var oldVal = this.slice();
                    //调用原始原型上的方法  
                    result = originalProto[method].apply(this, arguments);
                    //继续监听新数组  
                    self.observe(this, path);
                    self._callback(this, oldVal, path);
                    return result;
                }
            })
        });
        // 最后 让该数组实例的 __proto__ 属性指向 假的原型 overrideProto  
        array['__proto__'] = overrideProto;

    }



}

/**
 * ModelViewer 类
 */
class ViewModel<T>{
    constructor(data:T,tag:string) {
        new JsonOb(data,this._callback.bind(this));
        this.$data = data;
        this._tag = tag;
    }

    public $data:T;

    //索引值用的标签
    private _tag:string = null;

    /**激活状态, 将会通过 cc.director.emit 发送值变动的信号 */
    public active:boolean = true;

    //回调函数 请注意 回调的 path 数组是 引用类型，禁止修改
    private _callback(n: any, o: any, path:string[]):void{
            if(this.active == true){
                let name = VM_EMIT_HEAD + this._tag+'.'+ path.join('.')
                if(DEBUG_SHOW_PATH)console.log('>>',n,o,path);
                cc.director.emit(name,n,o,[this._tag].concat(path)); //通知末端路径

                cc.director.emit(VM_EMIT_HEAD+this._tag,n,o,path);//通知主路径

                if(path.length>=2){
                    for (let i = 0; i < path.length-1; i++) {
                        const e = path[i];
                        console.log('中端路径');
                        
                    }
                }

            }
    }

    //通过路径设置数据的方法
    public setValue(path: string, value: any) {
        setValueFromPath(this.$data,path,value,this._tag);
    }
    //获取路径的值
    public getValue(path: string,def?:any):any {
        return getValueFromPath(this.$data,path,def,this._tag);
    }
}

/**
 * VM 对象管理器(工厂)
 */
class VMManager {
        /**静态数组，保存创建的 mv 组件 */
        private _mvs:Array<{tag:string,vm:ViewModel<any>}> = [];

        private EMIT_HEAD = VM_EMIT_HEAD;


        /**
         * 绑定一个数据，并且可以由VM所管理
         * @param data 需要绑定的数据
         * @param tag 对应该数据的标签(用于识别为哪个VM，不允许重复)
         */
        add<T>(data:T,tag:string = 'global'){
            let vm = new ViewModel<T>(data,tag);
            let has = this._mvs.find(v=>v.tag === tag);
            if(tag.includes('.')){
                console.error('cant write . in tag:',tag);
                return;
            }
            if(has){
                console.error('already set VM tag:'+ tag);
                return;
            }
            this._mvs.push({tag:tag,vm:vm});
        }

        /**
         * 移除并且销毁 VM 对象
         * @param tag 
         */
        remove(tag:string){
            let index = this._mvs.findIndex(v => v.tag === tag);
            if(index >=0 ) this._mvs.splice(index,1);
        }

        /**
         * 获取绑定的数据
         * @param tag 数据tag
         */
        get<T>(tag:string):ViewModel<T>{
            let res = this._mvs.find(v => v.tag === tag);
            if(res == null){
                console.error('cant find VM from:',tag);
            }else{
                return res.vm;
            }
        }

        /**
         * 通过全局路径,而不是 VM 对象来 设置值
         * @param path - 全局取值路径
         * @param value - 需要增加的值
         */
        addValue(path: string, value: any) {
            path =  path.trim();//防止空格,自动剔除
            let rs = path.split('.');
            if(rs.length<2){console.error('Cant find path:'+path)};
            let vm = this.get(rs[0]);
            if(!vm){console.error('Cant Set VM:'+rs[0]);return;};
            let resPath = rs.slice(1).join('.');
            vm.setValue(resPath,vm.getValue(resPath)+value);
        }

        /**
         * 通过全局路径,而不是 VM 对象来 获取值
         * @param path - 全局取值路径
         * @param def - 如果取不到值的返回的默认值
         */
        getValue(path: string,def?:any):any {
            path =  path.trim();//防止空格,自动剔除
            let rs = path.split('.');
            if(rs.length<2){console.error('Cant find path:'+path)};
            let vm = this.get(rs[0]);
            if(!vm){console.error('Cant Get VM:'+rs[0]);return;};
            return vm.getValue(rs.slice(1).join('.'),def);
        }

        /**
         * 通过全局路径,而不是 VM 对象来 设置值
         * @param path - 全局取值路径
         * @param value - 需要设置的值
         */
        setValue(path: string, value: any) {
            path =  path.trim();//防止空格,自动剔除
            let rs = path.split('.');
            if(rs.length<2){console.error('Cant find path:'+path)};
            let vm = this.get(rs[0]);
            if(!vm){console.error('Cant Set VM:'+rs[0]);return;};
            vm.setValue(rs.slice(1).join('.'),value);
  
        }

        setObjValue = setValueFromPath;
        getObjValue = getValueFromPath;

        /**等同于 cc.director.on */
        bindPath(path: string, callback: Function, target?: any, useCapture?: boolean):void{
            path =  path.trim();//防止空格,自动剔除
            if(path.split('.')[0] === '*'){
                console.error(path,'路径不合法');
                return;
            }
            cc.director.on(VM_EMIT_HEAD + path, callback, target, useCapture);
        }

        /**等同于 cc.director.off */
        unbindPath(path: string, callback: Function, target?: any):void{
            path =  path.trim();//防止空格,自动剔除
            if(path.split('.')[0] === '*'){
                console.error(path,'路径不合法');
                return;
            }
            cc.director.off(VM_EMIT_HEAD + path, callback, target);
        }


        /**冻结所有标签的 VM，视图将不会受到任何信息 */
        inactive():void
        inactive(tags:string[]):void
        inactive(tag:string):void
        /**冻结一系列标签的操作 */
        inactive(tag?:any):void{

            if(Array.isArray(tag)){

            }else{

            }

        }

        /**激活所有标签的 VM*/
        active():void
        active(tags:string[]):void
        active(tag:string):void
        /**激活一系列标签的操作 */
        active(tag?:any):void{

            if(Array.isArray(tag)){

            }else{

            }

        }

 

}

//   整数、小数、时间、缩写

/**
 * 数值格式化函数, 通过语义解析自动设置值的范围
 *     //整数
 * 1:def(0)//显示一个默认值
 */
class FormatFunction {
    /** [value:int] 将取值变成整数 */
    int(value:number){
        return Math.round(value);
    }

    /** [value:fix2]数值转换为小数*/
    fix(value:number,fd:number){
        return value.toFixed(fd)
    }

    /** [value:limit3]字符串长度限制 */
    limit(value:string,count:number){
        return value.substring(0,count);
    }

    /** 将数字缩短显示为KMBT单位 大写,目前只支持英文 */
    KMBT(value:number,lang:string = 'en'){
        //10^4=万, 10^8=亿,10^12=兆,10^16=京，
        let counts = [1000,1000000,1000000000,1000000000000];
        let units = ['K','M','B','T'];

        switch (lang) {
            case 'zh':
                //10^4=万, 10^8=亿,10^12=兆,10^16=京，
                let counts = [10000,100000000,1000000000000,10000000000000000];
                let units = ['万','亿','兆','京'];
                break;
        
            default:
                break;
        }

        return this.compressUnit(value,counts,units,2);
    }


    //压缩任意单位的数字，后缀加上单位文字
    compressUnit(value,valueArr:number[],unitArr:string[],fixNum:number =2):string{
        let counts = valueArr;
        let units = unitArr;
        let res:string;
        let index;
        for (index = 0; index < counts.length; index++) {
            const e = counts[index];
            if(value < e){
                res = (value/e).toFixed(fixNum);
                break;
            }
            
        }

        return res + units[index];
    }

 

}

export let VM = new VMManager();