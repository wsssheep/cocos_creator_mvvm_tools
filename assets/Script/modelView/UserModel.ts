import { VM } from './JsonOb';

export class GlobalData {

    name: string = '';
    info: string = 'xin';
    gold: number = 0;
    diamond: number = 9000;
    progress: number = 0;
    icon: number = 0;
    check = {
        selectA: true,
        selectB: false,
        selectC: false,
    }
    obj = {
        progress: 0
    }
    array = [
        { name: 's1', age: 18, sex: 0 },
        { name: 's2', age: 16, sex: 1 },
        { name: 's3', age: 12, sex: 2 },
    ]

    //菜单状态（代表选择了哪个菜单
    menu = {
        state: 0
    }
}

class PlayData {
    name:string = '??? ';
    level:number = 0;
    exp:number = 0;//exp
    exp_max:number = 0;//升级目标exp

    hp:number = 50;
    mhp:number = 15000;
    mp:number =  700;
    mmp:number = 15000;

    atk:number = 5;
    mat:number = 10;
    def:number = 10;
    mdf:number = 10;
    spd:number = 100;
    luk:number = 5;
    cri:number = 0; //暴击率

    skill_point:number = 15;//技能点
    prop_point:number = 10; //属性点

    equips = [3,3,2,0,0,1,-1] //对应8个装备孔的id编号（会自动索引到需要的数据库）
}




class EditorData {
    gravity: number = 0;
    emissionRate: number = 0;
    life: number = 0;
    pos  = { x: 0, y: 0 }
    speed = 0;
    speedVar = 0;
    startSize = 60
    startSizeVar = 0;
    endSize = 10
    endSizeVar = 5;
}




//原始数据
export let global: GlobalData = new GlobalData();
export let ui: EditorData = new EditorData();
export let player:PlayData = new PlayData();


//数据模型绑定,定义后不能修改顺序
VM.add(global, 'game');    //定义全局tag
VM.add(ui, 'editor');           //定义全局tag
VM.add(player,'player');

//使用注意事项
//VM 得到的回调 onValueChanged ，不能强制修改赋值
//VM 的回调 onValueChanged 中，不能直接操作VM数据结构,否则会触发 循环调用