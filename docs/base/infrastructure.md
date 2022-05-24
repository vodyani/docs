---
sidebar_position: 3
slug: infrastructure
title: 基础设施层
---

:::tip
基础设施是 **Vodyani** 对外进行交流和协助的重要部分。

你可以在 [Vodyani 开发样例](https://github.com/vodyani/sample) 中学到如何使用不用类型的基础设施。
:::

<br/>

得益于 **Vodyani** 的高度模块化与清晰的结构分层，我们可以在基础设施层定义单向依赖模块。

你应该根据职责归属，定义不同的基础设施模块。

## 目录结构

```bash
.
├── infrastructure        基础设施层
│   ├── config            全局配置模块
│   ├── logger            全局日志模块
│   └── ...               其他模块
```