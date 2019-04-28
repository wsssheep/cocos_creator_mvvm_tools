import { VM } from './JsonOb';

//用来处理通知数据的层级
//控制旗下子节点的数据

//目前只是起到一个识别组件的作用，之后会抽象很多功能在这里面

const {ccclass, property,menu} = cc._decorator;

@ccclass
@menu('ModelViewer/VM-Parent (VM父节点)')
export default class VMParent extends cc.Component {
    
}
