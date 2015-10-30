
## CSS+JS实现预览图和幻灯片

### 慕课学习网址：http://www.imooc.com/learn/412

### 显示效果：http://www.alok2333.com/gadgets/css/preview-slideshow/

上次写的页面切换是用的纯CSS，是通过为radio标签的checked属性附上tranlateY来实现的，它的HTML是一早写好的了。

这次就利用了模板来动态生成html，直接用for in遍历data数组里的元素，再通过replace来改变模板关键字，再把新创建的元素push入一个空数组，最后join。
还有通过点击不同链接来动态切换 active类，只需要把 有active和无active两种情况在CSS中区别开就行了。

感觉老师讲的略快。。。
而且最后一步的时候因为在其他地方设置了 z-index=2，预览图被挡住了没显示，老师妹有注意到。
在预览图处重新给它加z-index>2的值就O了。


