
const VMParent = require('./../Script/modelView/VMParent');
const {VM} = require('./../Script/modelView/ViewModel');

//JS调用用例
cc.Class({
    extends: VMParent.default,
    ctor:function(){
        //data 数据在这里定义
        this.data = {
            name:'test_name',
            count:3
        };
    },

    properties: {
        
    },

    onBind(){
      console.log('绑定之后')  
    },

    onUnBind(){
        console.log('解除绑定之前')
    },

    start () {
        //继承VMParent 可以通过 this.VM 获取 VM 管理
       this.data.count =   this.VM.getValue('player.hp');

       // 直接 require VM 也可以进行操作: 比如 VM.getValue('player.mhp')
       this.data.count =   this.VM.getValue('player.hp')/ VM.getValue('player.mhp');


    },

    // update (dt) {},
});
