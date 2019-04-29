import { VM } from './../modelView/JsonOb';
import VMParent from '../modelView/VMParent';


const {ccclass, property} = cc._decorator;

//数据模型
class ModelAddPoint {

    point:number = 0;//可以使用的技能点
    use:number = 0; //已经使用的技能点

    data = {
        atk:0,
        mat:0,
        def:0,
        mdf:0,
        spd:0,
        luk:0,
        cri:0 //暴击率
    }

    add = {
        atk:0,
        mat:0,
        def:0,
        mdf:0,
        spd:0,
        luk:0,
        cri:0 //暴击率
    }


}
//数据实例
let add_point = new ModelAddPoint();
//绑定数据模型
VM.add(add_point,'add_point');

@ccclass
export default class VMAddPoint extends cc.Component {

    private player:any = VM.get('player').$data;

    // LIFE-CYCLE CALLBACKS:

    onLoad(){
        this.init();
    }

    init(){
        add_point.use = 0;

        //可以使用的 point
        add_point.point = this.player.prop_point;//获取技能点

        //加点值
        add_point.add = {
            atk:0,
            mat:0,
            def:0,
            mdf:0,
            spd:0,
            luk:0,
            cri:0 
        }
        
        //实际值(直接通过Vm 获取)
        add_point.data = {
            atk:this.player.atk,
            mat:this.player.mat,
            def:this.player.def,
            mdf:this.player.mdf,
            spd:this.player.spd,
            luk:this.player.luk,
            cri:this.player.cri
        }

    }



    //确认加点
    onAddFinished(){
        //结果保护
        if(add_point.use > add_point.point){
            return;
        }

        //加上加点值
        this.player.atk +=add_point.add.atk;
        this.player.mat +=add_point.add.mat;
        this.player.def +=add_point.add.def;
        this.player.mdf +=add_point.add.mdf;
        this.player.spd +=add_point.add.spd;
        this.player.luk +=add_point.add.luk;
        this.player.cri +=add_point.add.cri;

        this.player.prop_point -= add_point.use;

        this.node.destroy();

    }

    //取消加点
    onCancel(){
        this.node.destroy();
    }

    //重置加点
    onResetPointAdd(){
        add_point.add.atk = 0;
        add_point.add.mat = 0;
        add_point.add.def = 0;
        add_point.add.mdf = 0;
        add_point.add.spd = 0;
        add_point.add.luk = 0;
        add_point.add.cri = 0;

        add_point.data.atk = this.player.atk;
        add_point.data.mat = this.player.mat;
        add_point.data.def = this.player.def;
        add_point.data.mdf = this.player.mdf;
        add_point.data.spd = this.player.spd;
        add_point.data.luk = this.player.luk;
        add_point.data.cri = this.player.cri;

        add_point.use = 0;
    }

    //自动加点
    onAutoPointAdd(){
        let props = ['atk','mat','def','mdf','spd', 'luk', 'cri'];
        let adds = {
            atk:0,
            mat:0,
            def:0,
            mdf:0,
            spd:0,
            luk:0,
            cri:0 
        }
        let leftPoint =   add_point.point - add_point.use;

        
        for (let i = 0; i < leftPoint; i++) {
            let select = Math.floor(Math.random()*8);
            adds[props[select]] +=1;
        }

        //赋值
        add_point.use = add_point.point;
        //更新属性
        for (let i = 0; i < props.length; i++) {
            const prop = props[i];
            add_point.add[prop] += adds[prop];
            add_point.data[prop] += adds[prop];
        }

    }

    onPointAdd(e,prop:string){
        if(prop in add_point.add == false)return;
        if(add_point.use>=add_point.point){
            return;
        }
        add_point.add[prop] += 1;
        add_point.data[prop] +=1;
        add_point.use ++;

    }

    onPointSub(e,prop:string){
        if(prop in add_point.add == false)return;
        if(add_point.add[prop] <=0)return;
        add_point.add[prop] -= 1;
        add_point.data[prop] -= 1;
        add_point.use --;


    }

    start () {

    }

    // update (dt) {}
}
