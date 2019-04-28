

const { ccclass, property, executeInEditMode, menu } = cc._decorator;



/**
 * 用于搜索的MV 组件列表，挂载在父节点后，
 * 会遍历搜索下面的所有MV组件, 并且显示其观察值的路径
 */
@ccclass
@executeInEditMode
@menu('ModelViewer/Edit-Comps (快速组件操作)')
export default class MVCompsEdit extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    @property({
        type:[cc.String]
    })
    findList:string[] = ["MVCustom", "MVEvent", "MVLabel", "VMModify","VMState","VMParent"];
 
    @property({
        tooltip:'勾选后,会自动查找 find list 中填写的组件'
    })
    public get findTrigger(){
        return false;
    }
    public set findTrigger(v:boolean) {
        this.setComponents(0);
    }

    @property({
        tooltip:'勾选后,会批量激活 find list 中填写的组件'
    })
    public get enableTrigger(){
        return false;
    }
    public set enableTrigger(v:boolean) {
        this.setComponents(1);
    }

    @property({
        tooltip:'勾选后,会批量关闭 find list 中填写的组件'
    })
    public get disableTrigger(){
        return false;
    }
    public set disableTrigger(v:boolean) {
        this.setComponents(2);
    }

    @property({
        tooltip:'允许删除节点的组件,确定需要移除请勾选,防止误操作'
    })
    allowDelete:boolean = false;

    @property({
        tooltip:'勾选后,会批量删除 find list 中填写的组件',
        displayName:'[ X DELETE X ]',
        visible:function(){return this.allowDelete}
    })
    public get deleteTrigger(){
        return false;
    }
    public set deleteTrigger(v:boolean) {
        this.setComponents(3);
    }

    onLoad(){
        //不要把脚本挂载运行时的提示
        if(!CC_EDITOR){
          let path = this.getNodePath(this.node);
          console.error('you forget delete MVEditFinder,[path]',path);
        }
    }


    setComponents(state:number){
        let array = this.findList;
        let title = '搜索到当前节点下面的组件';
        switch (state) {
            case 0: title = '搜索到当前节点下面的组件';break;
            case 1: title = '激活以下节点的组件';break;
            case 2: title = '关闭以下节点的组件';break;
            case 3: title = '删除以下节点的组件';break;
            case 4: title = '替换以下节点的组件';break;
        
            default:
                break;
        }
        cc.log(title)
        cc.log('______________________')

        array.forEach(name => {
            this.searchComponent(name,state)
        })

        cc.log('______________________')
    }

    /**
     * 
     * @param className 
     * @param state 0-查找节点组件 1-激活节点组件 2-关闭节点组件 3-移除节点组件
     */
    searchComponent(className: string, state:number = 0) {
        let comps = this.node.getComponentsInChildren(className);
        if (comps == null || comps.length < 1) return;
        cc.log('[' + className + ']:');
        comps.forEach(v => {
            let ext = v.watchPath?':[Path:' + v.watchPath + ']' : '';
            cc.log(this.getNodePath(v.node) + ext);
            switch (state) {
                case 0://寻找组件

                    break;
                case 1://激活组件
                    v.enabled = true;
                    break;
                case 2://关闭组件
                    v.enabled = false;
                    break;
                case 3://删除组件
                    v.node.removeComponent(v);
                    break;
            
                default:
                    break;
            }
        });
    }

    getNodePath(node: cc.Node) {
        let parent = node;
        let array = [];
        while (parent) {
            let p = parent.getParent();
            if (p) {
                array.push(parent.name);
                parent = p;
            } else {
                break;
            }

        }

        return array.reverse().join('/');
    }

    onEnable() {

    }

    start() {

    }

    // update (dt) {}
}
