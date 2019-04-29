import { VM } from './JsonOb';

//用来处理通知数据的层级
//控制旗下子节点的数据

//目前只是起到一个识别组件的作用，之后会抽象很多功能在这里面

// player.equips.* 可以自动根据所在父对象的位置设置顺序

const {ccclass, property,menu} = cc._decorator;

@ccclass
@menu('ModelViewer/VM-Parent (VM父节点)')
export default class VMBase extends cc.Component {
    /**父路径 */
    public parentPath:string = '';

    //watch 单路径
    public watchPath:string = '';

    // watch 多路径
    protected watchPathArr:string[] = [];

    /**VM管理 */
    public VM = VM;

    onLoad(){
        if(CC_EDITOR)return;

        //提前拆分、并且解析路径
        let paths = this.watchPath.split('.');
        for (let i = 1; i < paths.length; i++) {
            const p = paths[i];
            //如果发现了路径使用了 * ，则自动去自己的父节点查找自己所在 index 值
            if(p == '*'){
                let index = this.node.getParent().children.findIndex(n=> n === this.node);
                if(index<=0)index = 0;
                paths[i] = index.toString();
                break;
            }
            
        }
        
        //替换掉原路径
        this.watchPath = paths.join('.');

        //提前进行路径数组 的 解析
        let pathArr = this.watchPathArr;
        if(pathArr.length >=1){
            for (let i = 0; i < pathArr.length; i++) {
                const path = pathArr[i];
                let paths = path.split('.');

                for (let i = 1; i < paths.length; i++) {
                    const p = paths[i];
                    if(p == '*'){
                        let index = this.node.getParent().children.findIndex(n=> n === this.node);
                        if(index<=0)index = 0;
                        paths[i] = index.toString();
                        break;
                    }
                    
                }

                this.watchPathArr[i] = paths.join('.'); 

            }
        }




        console.log('监听所有路径',this.watchPath)//pathArr[i] =  path.replace('*', tag);
    }

}
