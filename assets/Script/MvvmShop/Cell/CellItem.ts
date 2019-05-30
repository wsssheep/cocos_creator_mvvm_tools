import VMParent from "../../modelView/VMParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CellItem extends VMParent {

    data = {
        id:0,
        pic:1,
        equip:0,
        rare:3,
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    init(id,pic,equip,rare){
        this.data.id = id;
        this.data.pic = pic;
        this.data.equip = equip;
        this.data.rare = rare;
    }



    // update (dt) {}
}
