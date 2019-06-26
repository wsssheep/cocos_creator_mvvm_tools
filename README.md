# cocos_creator_mvvm_tools 0.1.1

### 版本说明
v0.1.0 - Typescript 的 稳定版本
v0.1.1 - 修复VMParent onLoad顺序的错误,调整部分组件初始化值的时间

### 简介

适用于cocos creator 的 mvvm 的工具 集，摆脱传统MVC设置节点属性来控制 UI 的方式。你可以更快捷、更细致地处理UI的表现效果。不写一行代码完成复杂的显示逻辑。设计这个框架的目地就是为了解决 数据和节点状态变化切换的麻烦关系。

### 更新
增加JS 调用 TS 用例 2019/6/1

### 功能

1. 不需要写任何代码，设置脚本组件的参数即可 将 监听路径的数值 可以立刻得到反馈。
2. 更加灵活的获取数据变化时的事件，实现各种难以处理的细节交互。
3. 彻底分离UI处理 和 游戏逻辑处理，专注处理业务逻辑。

### 注意事项

1. 查错困难: 一旦绑定组件后，想要根据情况查找和调查bug位置，会变得困难一些。(也是组件化的缺点)
2. 设计数据模型后不能随意改变属性名，一旦需要修改就必须打开Cocos 来改动，这会比较依赖于编辑器操作。所以在内部提供了一个小组件来批量替换路径名。

### 项目结构

核心脚本文件存放在 assets\Script\modelView 路径,要使用必须全部引入

- **JsonOb.ts** -  实现基础的 观察者模式, 改变绑定的数据会自动调用回调函数。你可以随时替换成自己写的观察者。
- **ViewModel.ts** - VM的核心模块，动态管理ViewModel，使用 cc.director.emit 通知 游戏内的节点组件改变状态。
- **VMBase.ts** - VM监听核心组件，用于接收ViewModel 的数值变动消息。VMCustom /VMEvent 之类的衍生组件都是继承自VMBase
- **VMParent.ts** - VM父组件，适合 prefab 弹窗使用， 它将数据绑定在继承 VMparent 的组件上，只属于此次创建的实例。 需要以特殊方式继承使用。

### 用法说明

- 基本用法

  **导入框架** -  导入  assets\Script\modelView 中的所有脚本
  **建立数据模型**  -  任意位置新建一个数据脚本，定义自己的数据模型，使用VM.add(data,'tag') 添加viewModel。 可以通过VM引用该数据，或者自己全局管理该数据模型。
  **挂脚本**  -  编辑器中直接添加组件 VMCustom ，它会自动识别绑定到需要设置值的组件和组件的属性，比如cc.Label、cc.Progress等。 你只要填写对应的watchPath, 就会自动赋值到组件的属性上。比如填写 global.play.hp
  **改数据**  -  在游戏中任意改变 global.play.hp的值，对应的label 就会自动改变数值。

- 全局注册VM:    (全局自由使用路径)
   VM.add(data,'tag'); // 

- 局部组件使用VM:   (只在组件内使用的相对路径)
  1.继承VMParent 组件
  2.在组件内设置 data 数据（data属性） 
  3.相对路径 使用  *.name 的方式设置 watchPath,VMParent 会在 onLoad 的时候自动将 * 替换成 实际的 ViewModel 标签，以便监听数据变化。

### 帮助说明

具体使用方式请查看附带文档：/docs

[使用文档]（ https://github.com/wsssheep/cocos_creator_mvvm_tools/tree/master/docs ）

