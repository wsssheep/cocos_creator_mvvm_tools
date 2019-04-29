import { VM } from './JsonOb';
import VMBase from "./VMBase";


const { ccclass, property } = cc._decorator;


/**
 * 提供VM环境，控制旗下所有VM节点
 * 一般用于 非全局的 VM绑定,VM 环境与 组件紧密相连
 * （Prefab 模式绑定）
 */
@ccclass
export default class VMParent extends cc.Component {

    /**绑定的标签，可以自定义 */
    protected tag: string = '_temp';

    /**需要绑定的私有数据 */
    protected data: any = {};

    public VM = VM;


    /**
     * [注意]不能直接覆盖此方法，如果需要覆盖。
     * 只能在该方法内部调用父类的实现 
    ```ts
        onLoad(){
            super.onLoad();
        }
    ``` 
     * 
     */
    protected onLoad() {
        if (this.data == null) return;

        let tag = this.tag + '<'+ this.node.uuid.replace('.', '') + '>';
        VM.add(this.data, tag);
        console.log(VM['_mvs'],tag);

        //搜寻所有节点：找到 watch path
        let comps = this.node.getComponentsInChildren('VMBase');
        console.group();
        for (let i = 0; i < comps.length; i++) {
            const comp = comps[i];
            console.log(comp.node.name + ' > ', comp.name);
            let path: string = comp['watchPath'];
            let comp_name: string = comp.name;

            if (comp_name.includes('VMLabel') && comp['templateMode'] == true) {
                 let pathArr:string[] = comp['templatePathArr'];
                 if(pathArr){
                    for (let i = 0; i < pathArr.length; i++) {
                        const path = pathArr[i];
                        pathArr[i] =  path.replace('*', tag);
                    }
                 }

            } else {
                //VMLabel

                //遇到特殊 path 就优先替换路径
                if (path.split('.')[0] === '*') {
                    comp['watchPath'] = path.replace('*', tag);

                    console.log(comp['watchPath']);
                }

            }
            console.log(' path>', comp.name);



        }
        console.groupEnd()

        this.onBind();
    }

    /**在 onLoad 完成 和 start() 之前调用，你可以在这里进行初始化数据等操作 */
    protected onBind() {

    }

    /**
     * [注意]不能覆盖此方法，如果需要覆盖。
     * 需要在该方法内部调用父类的实现，再定义自己的方法
      ```ts
        onDestroy(){
            super.onDestroy();
        }
      ```
     */
    protected onDestroy() {
        //解除全部引用
        let tag = this.tag + '<' + this.node.uuid.replace('.', '') + '>';
        VM.remove(tag);
        this.data = null;
    }

    // update (dt) {}
}
