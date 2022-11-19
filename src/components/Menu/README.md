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
1.Menu 组件要将 当前选择的 selectedItem 和选择回调函数透传给每一个 item，为了不通过一堆 props 透传，使用了 createContext

2.对于 children 的处理，可以考虑使用 React.children.map 或者 React.children.foreach 去遍历 children 数组里面的子节点，如果子节点是 null 或者 undefined，此方法会返回 null 或者是 undefined，而不会返回数组。
