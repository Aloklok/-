
## CSS实现网页平滑过渡


### 显示效果：http://www.alok2333.com/gadgets/css/smooth-transition/



---


---

笔记：

1. 3D变换开启GPU模式来加速：http://www.aseoe.com/show-11-144-1.html
2. 定义一些形状如三角形或正方形，可通过after动态地加上去。
如果在形状内加字，可以通过例如`content:attr(data-icon)`语句，如果加的是小图标，则content要和小图标自带的content名相同。
3. 动画：如果是通过响应（如点击）才发生的，则用`transition`。非响应，自行发生的，则`animation`。
这里切换页面时用的是`translateY`，切换页面后标题等的动画用的是`animation`，定义了相应的keyframe。
可以参考下 http://www.zhihu.com/question/19749045
4. ~和+的区别：~找的是所有的兄弟元素，+号找的是子节点元素。
5. 整个页面的重点：radio的checked状态，通过在选择器中选择checked，来间接“动态”地给当前链接附样式。


