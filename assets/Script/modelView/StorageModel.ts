
// 玩家数据库存（测试用 全局数据，你可以把这些数据放在任意地方）

/**游戏配置的基本道具列表 */
export let ConfigItemStorage = [
    {
        id:1,
        type:0, //装备孔的类型  ('武器','服装','首饰')
        rank:0, //品质星级 （通用）
        pic:4,  //图片编号 （通用）
        atk:1,
        def:10,
        price:1200,
    },
    {
        id:2,
        type:1, //装备孔的类型
        rank:3, //品质星级 （通用）
        pic:3,  //图片编号 （通用）
        atk:1,
        def:10,
        price:1200,
    },
    {
        id:3,
        type:2, //装备孔的类型
        rank:0, //品质星级 （通用）
        pic:5,  //图片编号 （通用）
        atk:1,
        def:10,
        price:1200,
    },
];


export let ConfigSkills = [
    {
        id:1,
        pic:0,
        max:3,
        name:'新手练习',
        type:0,  //技能类型 0 - 主动技能 1- 被动技能 2- buff技能
    },
    {
        id:2,
        pic:1,
        max:3,
        name:'突破',
        type:0,  //技能类型 0 - 主动技能 1- 被动技能 2- buff技能
    },
    {
        id:3,
        pic:2,
        max:3,
        name:'绝技',
        type:0,  //技能类型 0 - 主动技能 1- 被动技能 2- buff技能
    },
    {
        id:4,
        pic:3,
        max:3,
        name:'看破',
        type:0,  //技能类型 0 - 主动技能 1- 被动技能 2- buff技能
    },
    {
        id:5,
        pic:4,
        max:3,
        name:'闪烁',
        type:0,  //技能类型 0 - 主动技能 1- 被动技能 2- buff技能
    },
    {
        id:6,
        pic:5,
        max:3,
        name:'翻转',
        type:0,  //技能类型 0 - 主动技能 1- 被动技能 2- buff技能
    },
    {
        id:7,
        pic:6,
        max:3,
        name:'秘密',
        type:0,  //技能类型 0 - 主动技能 1- 被动技能 2- buff技能
    },
]

/**玩家的背包 */
export let PlayerItemPackage = [
    {
        id:1,//背包索引编号-唯一ID
        itemId:1, //对应的道具id
        equip:0 //是否被装备（背包用）
    },
    {
        id:2,
        itemId:2,
        equip:0 //是否被装备（背包用）
    },
    {
        id:3,
        itemId:3,
        equip:0 //是否被装备（背包用）
    },
    {
        id:3,
        itemId:4,
        equip:1 //是否被装备（背包用）
    },
];

export let PlayerSKills = [
    {
        id:1,
        tag:'skill1',
        skillId:1,
        level:0,
        unlock:1,
        condition:{}
    },
    {
        id:2,
        tag:'skill1-2',
        skillId:3,
        level:0,
        unlock:0,
        condition:{
            skill:1, 
            point:3, 
        }
    },
    {
        id:3,
        tag:'skill1-3',
        skillId:4,
        level:0,
        unlock:0,
        condition:{
            skill:1,
            point:3,
        }
    },
    {
        id:4,
        tag:'skill1-3-4',
        skillId:5,
        level:0,
        unlock:0,
        condition:{
            skill:3,
            point:3,
        }
    },
    {
        id:5,
        tag:'skill1-3-4-5',
        skillId:6,
        level:0,
        unlock:0,
        condition:{
            skill:4,
            point:3,
        }
    },
    {
        id:6,
        tag:'skill1-3-4-5-6',
        skillId:7,
        level:0,
        unlock:0,
        condition:{
            skill:3,
            point:3,
            all_use:3
        }
    },
    {
        id:7,
        tag:'skill2',
        skillId:2,
        level:0,
        unlock:0,
        condition:{
            skill:-1,//前置条件 技能id
            point:-1, //前置条件 
            all_use:20  //必须累计使用技能点数
        }
    },
];





/**商店货物id */
export let ShopItemPackage = [
    {
        id:1,//背包索引编号-唯一ID
        itemId:1, //对应的道具id
        equip:0, //是否被装备（背包用）
        off:1
    },
    {
        id:2,//背包索引编号-唯一ID
        itemId:2, //对应的道具id
        equip:0, //是否被装备（背包用）
        off:1
    },
    {
        id:3,//背包索引编号-唯一ID
        itemId:3, //对应的道具id
        equip:0, //是否被装备（背包用）
        off:1
    },
  
]