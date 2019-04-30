import { ConfigSkills, PlayerSKills } from './../../modelView/StorageModel';
import BhvFrameIndex from "../../../Behavior/ui/BhvFrameIndex";
import { player } from '../../modelView/UserModel';


const {ccclass, property} = cc._decorator;

interface CellData {
    id:number,
    pic:number,
    level:number,
    max:number,
    unlock:number,
    condition:{
        skill:number, 
        point:number,
        all_use:number
    }
}


@ccclass
export default class CellSkillIcon extends cc.Component {

    @property
    private _index : number = 0;
    /**技能的数据库编号 */
    public get index() : number {
        return this._index;
    }
    @property
    public set index(v : number) {
        if(v<=-1) v =-1;
        let res =  this.getData(v);
        if(res == true){
            this._index = v; 
        }

        this.refreshCell();
    }
    
    private data:CellData;
    private skill_point:number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

 
    //监听一个数值，当skillPoint刷新时
    onSkillPointChange(n){
        //todo 解决顺序的坑点
        this.index = this.index; //这里刷新获取的 不是最新的 player.skill_point 值 
        this.skill_point = n;//!注意顺序问题，从这个函数获取的n 值，才是最新的
        this.refreshCell();//这个时候再手动更新一次
    }

    onEnable(){
        this.skill_point = player.skill_point; //初始化 skill_point 值
        this.index = this.index;//刷新一次
    }

    getData(v:number):boolean{
        let user = PlayerSKills.find(data => data.id === v);
        if(user ==null)return false;
        let skill = ConfigSkills.find(data => data.id === user.skillId);
        if(skill ==null)return false;

        this.data = {
            id:v,
            pic:skill.pic,
            level:user.level,
            max:skill.max,
            unlock:user.unlock,
            condition:{
                skill:user.condition.skill, 
                point:user.condition.point, 
                all_use:user.condition.all_use,
            },
        }

        //检查是否解锁及技能
        if(this.checkConditionFill()){
            user.unlock =1;
            this.data.unlock =1;
        }
        

        return true;
    }

    addLevel(){
        //升级技能点
        let p = PlayerSKills.find(data => data.id === this.index);
        if(p ==null)return false;
        if(player.skill_point<1)return;
        p.level +=1;
        player.skill_point -=1;

        //刷新数据/刷新细胞
        this.getData(this.index);
        this.refreshCell()

    }

    //检查解锁条件是否满足
    checkConditionFill(){
        let cod = this.data.condition;
        let player = PlayerSKills.find(data=>data.id === cod.skill);
        if(player == null)return;
        let skill = ConfigSkills.find(data=> data.id === player.skillId);
        if(player.level >= skill.max){
            return true;
        }else{
            return false;
        }

    }

    refreshCell(){
        if(!this.data)return;
        let icon = this.node.getChildByName('icon');
        let frame = this.node.getChildByName('icon').getComponent(BhvFrameIndex);
        let point = this.node.getChildByName('point').getComponent(cc.Label);
        let text = this.node.getChildByName('text');
        let btn_add = this.node.getChildByName('btn_add');
        frame.index = this.data.pic;
        point.string = this.data.level+'/'+this.data.max;

        if(this.data.unlock ===0){
            text.active = true;
            icon.opacity = 55;
        }else{
            text.active = false;
            icon.opacity = 255;
        }


        if(this.data.level < this.data.max && this.skill_point>0 && this.data.unlock ===1){
            btn_add.active = true;
        }else{
            btn_add.active = false;
        }

    }

    // update (dt) {}
}
