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


//数据模型绑定,定义后不能修改顺序
VM.add(global, 'game');    //定义全局tag
VM.add(ui, 'editor');           //定义全局tag


//使用注意事项
//VM 得到的回调 onValueChanged ，不能强制修改赋值
//VM 的回调 onValueChanged 中，不能直接操作VM数据结构,否则会触发 循环调用