<!--Menu组件的需求分析 -->

一般 Menu 组件是有横向或者纵向
Menu 组件支持对某一项点击高亮, 且支持对每一项展开。
代码结构如下,更加语义化，更加像 HTML 的解决方案

<Menu>
    <Menu.Item></Menu.Item>
    <Menu.Item>
    </Menu.Item>
    <Menu.Item>
    </Menu.Item>
</Menu.Item>

难点:
Menu 组件要将 index 和选择回调函数透传给每一个 item，用到 react.create
