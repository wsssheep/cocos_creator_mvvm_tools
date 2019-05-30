import { VM } from './../modelView/ViewModel';


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
    name:string = '默认的名字';
    level:number = 0;
    exp:number = 15255;//exp
    exp_max:number = 100000;//升级目标exp
    gold:number = 10000;

    hp:number = 450;
    mhp:number = 1500;
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

    equips = [3,3,12,0,0,1,-1] //对应8个装备孔的id编号（会自动索引到需要的数据库）
}

/**
 * 局部UI显示内容
 */
class HomeUiInfo {
    bag = {
        sort:0,
        type:'all',
    }
    skill = {
        id:0,
        pic:0,
        name:'??',
        level:0,
        info:'未知'
    }
}


//原始数据
export let global: GlobalData = new GlobalData();
export let player:PlayData = new PlayData();
export let homeUI:HomeUiInfo = new HomeUiInfo();


//数据模型绑定,定义后不能修改顺序
VM.add(global, 'game');    //定义全局tag
VM.add(homeUI, 'ui');           //定义全局tag
VM.add(player,'player');


//使用注意事项
//VM 得到的回调 onValueChanged ，不能强制修改赋值
//VM 的回调 onValueChanged 中，不能直接操作VM数据结构,否则会触发 循环调用