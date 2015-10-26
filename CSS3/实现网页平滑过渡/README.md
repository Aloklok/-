慕课学习网址：http://www.imooc.com/learn/252

显示效果：http://www.alok2333.com/gadgets/css/smooth%20transition/

这个页面有个特别之处，就是纯CSS手工打造，没有js文件，哈哈。

这相当于添加了CSS的工作量，在实际应用或许不这么做，但对CSS3的进一步了解很有帮助。

像我之前很少写CSS，不喜欢写，趁此机再多多琢磨下。。

老师讲的蛮顺的，但是有的地方觉得有些小问题：

1. html中的`<a href="#st-panel-1">`没有用上，或许是为帮助理解，但我觉得反而容易误解为点击后自动会跳转，而且眼花。于是直接改为`<a href="#">`。

2. 另外CSS中定义了个 .clr{} ，但html中没有用到。于是删去。

3. 看到`-webkit-backface-visibility`，不太懂啥叫"定义当元素不面向屏幕时是否可见"。
http://www.w3school.com.cn/tiy/t.asp?f=css3_backface-visibility，看了左边链接后它与这个页面关系不大，毕竟它是X轴旋转的，还没看到背面呢。所以删去了。


笔记：

1. 3D变换开启GPU模式来加速：http://www.aseoe.com/show-11-144-1.html
2. 定义一些形状如三角形或正方形，可通过after动态地加上去。
如果在形状内加字，可以通过例如`content:attr(data-icon)`语句，如果加的是小图标，则content要和小图标自带的content名相同。
3. 动画：如果是通过响应（如点击）才发生的，则用`transition`。非响应，自行发生的，则`animation`。
这里切换页面时用的是`translateY`，切换页面后标题等的动画用的是`animation`，定义了相应的keyframe。
可以参考下 http://www.zhihu.com/question/19749045
4. ~和+的区别：~找的是所有的兄弟元素，+号找的是子节点元素。
5. 整个页面的重点：radio的checked状态，通过在选择器中选择checked，来间接“动态”地给当前链接附样式。


