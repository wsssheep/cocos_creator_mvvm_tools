
// 玩家数据库存（测试用 全局数据，你可以把这些数据放在任意地方）

/**游戏配置的基本道具列表 */
export let ConfigItemStorage = [
    {   //道具
        id:1,
        type:0, //装备孔的类型  ('0-道具','1-武器','2-服装','3-首饰')
        rank:0, //品质星级 （通用）
        pic:0,  //图片编号 （通用）
        atk:1,
        def:10,
        price:500,
    },
    {   //武器
        id:2,
        type:1, //装备孔的类型
        rank:3, //品质星级 （通用）
        pic:2,  //图片编号 （通用）
        atk:5,
        def:2,
        price:1200,
    },
    {   //武器
        id:3,
        type:1, //装备孔的类型
        rank:0, //品质星级 （通用）
        pic:2,  //图片编号 （通用）
        atk:5,
        def:1,
        price:1200,
    },
    {   //武器
        id:4,
        type:1, //装备孔的类型
        rank:3, //品质星级 （通用）
        pic:5,  //图片编号 （通用）
        atk:1,
        def:10,
        price:1200,
    },
    {   //武器
        id:5,
        type:2, //装备孔的类型
        rank:0, //品质星级 （通用）
        pic:5,  //图片编号 （通用）
        atk:1,
        def:10,
        price:1200,
    },
    {   //首饰
        id:6,
        type:3, //装备孔的类型
        rank:0, //品质星级 （通用）
        pic:4,  //图片编号 （通用）
        atk:1,
        def:10,
        price:1200,
    },
    {  //首饰
        id:7,
        type:3, //装备孔的类型
        rank:0, //品质星级 （通用）
        pic:6,  //图片编号 （通用）
        atk:1,
        def:10,
        price:1200,
    },
    {  //首饰
        id:8,
        type:3, //装备孔的类型
        rank:0, //品质星级 （通用）
        pic:1,  //图片编号 （通用）
        atk:15,
        def:10,
        price:2500,
    },
    {  //服装
        id:9,
        type:2, //装备孔的类型
        rank:1, //品质星级 （通用）
        pic:1,  //图片编号 （通用）
        atk:15,
        def:10,
        price:2500,
    },
    {  //服装
        id:10,
        type:2, //装备孔的类型
        rank:2, //品质星级 （通用）
        pic:3,  //图片编号 （通用）
        atk:15,
        def:10,
        price:2500,
    },
    {  //服装
        id:11,
        type:2, //装备孔的类型
        rank:3, //品质星级 （通用）
        pic:3,  //图片编号 （通用）
        atk:15,
        def:10,
        price:2500,
    },
    {  //服装
        id:12,
        type:2, //装备孔的类型
        rank:4, //品质星级 （通用）
        pic:3,  //图片编号 （通用）
        atk:15,
        def:10,
        price:2500,
    },
];


export let ConfigSkills = [
    {
        id:1,
        pic:0,
        max:3,
        name:'USB充能',
        info:'是时候给自己充充电了，增加充能效率 5% 每级',
        type:0,  //技能类型 0 - 主动技能 1- 被动技能 2- buff技能
    },
    {
        id:2,
        pic:1,
        max:3,
        name:'突破',
        info:'技能描述，这肯定是一个厉害的技能，不用描述怎么做了',
        type:0,  //技能类型 0 - 主动技能 1- 被动技能 2- buff技能
    },
    {
        id:3,
        pic:2,
        max:3,
        name:'手柄',
        info:'键盘已经不能满足你了，用手柄获得更优质的游戏体验吧',
        type:0,  //技能类型 0 - 主动技能 1- 被动技能 2- buff技能
    },
    {
        id:4,
        pic:3,
        max:3,
        name:'看破',
        info:'对手的任何招式，在你眼中都是小儿科。提前攻击概率 + 5% 每级',
        type:0,  //技能类型 0 - 主动技能 1- 被动技能 2- buff技能
    },
    {
        id:5,
        pic:4,
        max:3,
        name:'知识点',
        info:'这里是一个知识点，知识点越多你的智力就越高',
        type:0,  //技能类型 0 - 主动技能 1- 被动技能 2- buff技能
    },
    {
        id:6,
        pic:5,
        max:3,
        name:'购物欲',
        info:'疯狂买买买，喜欢购物的你，能够搜刮各类优惠券。商店货物价格 - 5% 每级',
        type:0,  //技能类型 0 - 主动技能 1- 被动技能 2- buff技能
    },
    {
        id:7,
        pic:6,
        max:3,
        name:'黑框眼镜',
        info:'技能描述，所有buff 的持续时间 都 +1s 每级',
        type:0,  //技能类型 0 - 主动技能 1- 被动技能 2- buff技能
    },
]

/**玩家的背包 */
export let PlayerItemPackage = [
    {
        id:1,//背包索引编号-唯一ID
        itemId:1, //对应的道具id
        type:0, //道具分类('0-道具','1-武器','2-服装','3-首饰')
        equip:0, //是否被装备（背包用）
        count:1, //道具的数量
        getTime:10  //获取的时间
    },
    {
        id:2,
        itemId:2,
        type:1,
        equip:0, //是否被装备（背包用）
        count:1, //道具的数量
        getTime:15
    },
    {
        id:3,
        itemId:3,
        type:1,
        equip:1, //是否被装备（背包用）
        count:1, //道具的数量
        getTime:30
    },
    {
        id:4,
        itemId:4,
        type:1,
        equip:0, //是否被装备（背包用）
        count:1,
        getTime:45
    },
    {
        id:5,
        itemId:4,
        type:1,
        equip:0, //是否被装备（背包用）
        count:1,
        getTime:45
    },
    {
        id:6,
        itemId:4,
        type:1,
        equip:0, //是否被装备（背包用）
        count:1,
        getTime:45
    },
    {
        id:7,
        itemId:4,
        type:1,
        equip:0, //是否被装备（背包用）
        count:1,
        getTime:50
    },
    {
        id:8,
        itemId:4,
        type:1,
        equip:0, //是否被装备（背包用）
        count:1,
        getTime:450
    },
    {
        id:9,//背包索引编号-唯一ID
        itemId:8, //对应的道具id
        type:3, //道具分类('0-道具','1-武器','2-服装','3-首饰')
        equip:0, //是否被装备（背包用）
        count:1, //道具的数量
        getTime:10  //获取的时间
    },
    {
        id:10,//背包索引编号-唯一ID
        itemId:10, //对应的道具id
        type:2, //道具分类('0-道具','1-武器','2-服装','3-首饰')
        equip:0, //是否被装备（背包用）
        count:1, //道具的数量
        getTime:10  //获取的时间
    },
    {
        id:11,//背包索引编号-唯一ID
        itemId:11, //对应的道具id
        type:2, //道具分类('0-道具','1-武器','2-服装','3-首饰')
        equip:0, //是否被装备（背包用）
        count:1, //道具的数量
        getTime:10  //获取的时间
    },
    {
        id:12,//背包索引编号-唯一ID
        itemId:12, //对应的道具id
        type:2, //道具分类('0-道具','1-武器','2-服装','3-首饰')
        equip:1, //是否被装备（背包用）
        count:1, //道具的数量
        getTime:10  //获取的时间
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