---
sidebar_position: 0
slug: core
title: 公共约定层
---

:::tip
公共约定是 Vodyani 重要组成部分，但是拥有全局约定 != all in one。

你可以在 [Vodyani 开发样例](https://github.com/vodyani/sample) 中学到如何区分全局定义和局部定义。
:::

<br/>

得益于 Vodyani 的高度模块化与清晰的结构分层，我们不需要把业务定义，类型定义，领域定义一股脑地聚合在一个地方。

你应该根据职责归属，放在不同层级的对应模块中，只有需要全局声明的才会写在这里。

## 目录结构

```bash
.
├── base                    模块公共类
├── common                  模块公共
│   ├── abstract            用于声明全局抽象类
│   ├── constant            用于声明全局常量
│   ├── declare             用于声明全局依赖
│   ├── enum                用于声明全局常量
│   ├── interface           用于声明全局接口
│   └── type                用于声明全局类型
├── do                      用于声明全局领域对象
├── dto                     用于声明全局数据传输对象
├── decorator               用于声明全局 AOP 装饰器
├── filter                  用于声明全局 AOP 异常过滤器
├── interceptor             用于声明全局 AOP 拦截器
├── method                  用于声明全局函数方法
├── pipe                    用于声明全局 AOP 管道
└── vo                      用于声明全局返回对象
```