# tl-screeps-bot

一个我自己使用的screeps-ai，内容不多，写的很菜。

基本框架源自于[hoho大佬的文字教程](https://www.jianshu.com/p/5431cb7f42d3)，但并没有完全完成教程中提到的所有内容。

多房间部分的代码，都是写死的。已经添加了配置外矿的api，但外矿部分的操作并没有读取配置。

[抽象角色系统](https://www.jianshu.com/p/f61aa132d1ca)，只是简单的把官方教程中的角色系统照搬过来，只有最基本的harvester配置了Source的id，但也只可手动调用。

[数量控制系统](https://www.jianshu.com/p/d5e1a50473ce)，已经基本完成，每一个Creep会考虑自己准备的时间和身体尺寸来提前发布产卵任务。但是只有builder在没有建筑工地时会取消继续产卵（甚至没有检查建筑工地自动产builder）。

目前打算优化低级房的逻辑，至少可以苟完前5级吧。

然后考虑添加物流任务系统，lab任务队列。
