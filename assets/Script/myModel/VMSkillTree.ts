class SkillTree {
    skills:[
        {
            level:0,
            max:3,
            unlock:true, //解锁状态
            //技能点条件
            cod:{
                skill:3,//需要某个前置技能加满
                point:0 //需要累积加点数量
            }
        },
        {
            level:0,
            max:3,
            cod:{

            }
        }
    ]
}



const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
