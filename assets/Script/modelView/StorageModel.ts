
//玩家数据库存（测试用 全局数据，你可以把这些数据放在任意地方）

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