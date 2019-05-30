import { VM } from './../modelView/ViewModel';
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


@ccclass
export default class VMAddPoint extends VMParent {

    player:any = VM.get('player').$data;

    /**需要绑定的data数据直接复写 */
    data:ModelAddPoint = new ModelAddPoint();
    

    onBind(){
        this.init();
    }

    init(){
        this.data.use = 0;

        //可以使用的 point
        this.data.point = this.player.prop_point;//获取技能点

        //加点值
        this.data.add = {
            atk:0,
            mat:0,
            def:0,
            mdf:0,
            spd:0,
            luk:0,
            cri:0 
        }
        
        //实际值(直接通过Vm 获取)
        this.data.data = {
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
        if(this.data.use > this.data.point){
            return;
        }

        //加上加点值
        this.player.atk +=this.data.add.atk;
        this.player.mat +=this.data.add.mat;
        this.player.def +=this.data.add.def;
        this.player.mdf +=this.data.add.mdf;
        this.player.spd +=this.data.add.spd;
        this.player.luk +=this.data.add.luk;
        this.player.cri +=this.data.add.cri;

        this.player.prop_point -= this.data.use;

        this.node.destroy();

    }

    //取消加点
    onCancel(){
        this.node.destroy();
    }

    //重置加点
    onResetPointAdd(){
        this.data.add.atk = 0;
        this.data.add.mat = 0;
        this.data.add.def = 0;
        this.data.add.mdf = 0;
        this.data.add.spd = 0;
        this.data.add.luk = 0;
        this.data.add.cri = 0;

        this.data.data.atk = this.player.atk;
        this.data.data.mat = this.player.mat;
        this.data.data.def = this.player.def;
        this.data.data.mdf = this.player.mdf;
        this.data.data.spd = this.player.spd;
        this.data.data.luk = this.player.luk;
        this.data.data.cri = this.player.cri;

        this.data.use = 0;
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
        let leftPoint =   this.data.point - this.data.use;

        
        for (let i = 0; i < leftPoint; i++) {
            let select = Math.floor(Math.random()*8);
            adds[props[select]] +=1;
        }

        //赋值
        this.data.use = this.data.point;
        //更新属性
        for (let i = 0; i < props.length; i++) {
            const prop = props[i];
            this.data.add[prop] += adds[prop];
            this.data.data[prop] += adds[prop];
        }

    }

    onPointAdd(e,prop:string){
        if(prop in this.data.add == false)return;
        if(this.data.use>=this.data.point){
            return;
        }
        this.data.add[prop] += 1;
        this.data.data[prop] +=1;
        this.data.use ++;

    }

    onPointSub(e,prop:string){
        if(prop in this.data.add == false)return;
        if(this.data.add[prop] <=0)return;
        this.data.add[prop] -= 1;
        this.data.data[prop] -= 1;
        this.data.use --;


    }

}
