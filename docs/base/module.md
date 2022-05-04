---
sidebar_position: -1
slug: module
title: 模块
---

> 模块是 Vodyani 的基石，模块的概念继承自 Nest.js。

![](../../static/img/Modules_1.png)

`Module` 本质上是某一块独立职责功能的集合体的注册表。在开发过程中，我们将使用 `Module` 类来对模块与模块之间的依赖关系进行描述，并注入到全局的 IOC 容器中。

## 模块注册器

在开发中，我们可以用到的模块注册装饰器有如下几种：

- `ApiModule` 应用接口模块注册器
- `DomainModule` 领域业务模块注册器
- `ContainerModule` 全局模块注册器（也对应着 Nest.js 中的根模块注册器）
- `Module` 通用模块注册器

其中，`ApiModule`，`DomainModule`，`ContainerModule` 本质上是 `Module` 装饰器的扩展，固定了需要注册的内容，为的是统一和规范命名。

### 应用接口层模块注册器

### 领域业务模块注册器

### 全局模块注册器

### 通用模块注册器

## 模块通用约定

- `base`        模块公共类
- `module`      模块容器
- `method`      模块函数方法
- `common`      模块公共
  - `abstract`  用于声明抽象类
  - `constant`  用于声明常量
  - `declare`   用于声明依赖
  - `enum`      用于声明常量
  - `interface` 用于声明接口
  - `type`      用于声明类型
