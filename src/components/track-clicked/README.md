# 埋点

## 路由埋点 routerTracking

1. 项目初始化时使用 routerTracking 方法
2. 固定的路由，能直接匹配到的路由名称直接在对应的配置添加
3. 动态路由，比如 http://www.test.com/a/{id}，截取固定且唯一的路由

## 页面埋点 pageViewTracking

1. 页面埋点跟路由埋点的区别是，页面埋点可能是弹窗出现，或者是在一个路由中不同页面的切换，总之就是路由不变但需要进行页面埋点
2. 直接在 useEffect 中使用 pageViewTracking 方法，传入对应的埋点事件即可

## 按钮点击埋点

1. 使用 track-clicked 组件
