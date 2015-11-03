
## CANVAS实现酷炫倒计时效果

### 慕课学习网址：http://www.imooc.com/learn/133

### 显示效果：http://www.alok2333.com/gadgets/canvas/countdown

按照老师的教程逐步做下来，步骤大致如下：

1. 对数组内容进行样式设置，进而整体布局,绘制数字。
绘制圆的canvas函数  context.arc(圆心x位置,圆心y位置,半径,起始弧度位置,终点弧度位置);

2. 绘制小球
小球的绘制在一个动态数组balls[]的基础上完成的，balls[]的每一个元素都有对应的color、x值、y值，再调用arc()函数即可。

3. 设置动画
这里改变了老师的setInterval()的方法，而是改用了requestAnimationFrame()。
其功能和setInterval()差不多，但能大大优化CPU。当页面不在active状态时不会积累小球导致卡机，另一种方法是使用 离屏缓存，搜了一下比较麻烦便没有使用。

动画需要改变的内容有数字和小球，最重要的是得到时间的变化，根据时间的变化可以

①改变动态数组balls[]。
②改变数字和小球：通过render()函数的清除全屏，重新绘制数字和小球。





