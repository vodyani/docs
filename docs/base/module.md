---
sidebar_position: -1
slug: module
title: 模块
---

:::tip
模块是 Vodyani 的基石，模块的概念继承自 Nest.js。
:::

![](../../static/img/Modules_1.png)

`Module` 本质上是某一块独立职责功能的集合体的注册表。

在开发过程中，我们将使用 `Module` 类来对模块与模块之间的依赖关系进行描述，并注入到全局的 IOC 容器中。

## 模块注册器

在开发中，我们可以用到的模块注册装饰器有如下几种：

- `ApiModule` 应用接口模块注册器
- `DomainModule` 领域业务模块注册器
- `ContainerModule` 全局模块注册器（也对应 Nest.js 中的 Application Module）
- `Module` 通用模块注册器

其中，`ApiModule`，`DomainModule`，`ContainerModule` 本质上是 `Module` 装饰器的扩展，固定了需要注册的内容，为的是统一和规范命名。

### 通用模块注册器

> 在 Vodyani 中，一般不需要在 `Module` 中定义controllers

```typescript
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  exports: [],
  providers: [],
})
export class DemoModule {}
```

|参数|类型|含义|
|:-:|:-:|:-:|
|imports|array|导入模块的列表，这些模块导出了此模块中所需提供者|
|exports|array|由本模块提供并应在其他模块中可用的提供者的子集|
|providers|array|提供者|

### 应用接口层模块注册器

```typescript
import { ApiModule } from '@vodyani/core';

@ApiModule({
  imports: [],
  controller: [],
  consumer: [],
  aop: [],
})
export class DemoApi {}
```

|参数|类型|含义|
|:-:|:-:|:-:|
|imports|array|导入模块的列表，这些模块导出了此模块中所需提供者|
|controller|array|HTTP 路由控制器，由 Controller 装饰器绑定的类|
|consumer|array|消费提供者|
|aop|array|切面提供者|

### 领域业务模块注册器

```typescript
import { DomainModule } from '@vodyani/core'';

@DomainModule({
  imports: [],
  exports: [],
  service: [],
  manager: [],
  repository: [],
  provider: [],
  entity: [],
})
export class DemoDomain {}
```

|参数|类型|含义|
|:-:|:-:|:-:|
|imports|array|导入模块的列表，这些模块导出了此模块中所需提供者|
|exports|array|由本模块提供并应在其他模块中可用的提供者的子集|
|service|array|领域业务提供者|
|manager|array|领域业务协调者|
|repository|array|领域业务聚合根|
|provider|array|基础设施协调者|
|entity|array|实体提供者|

### 全局模块注册器

```typescript
import { ContainerModule } from '@vodyani/core'';

@ContainerModule({
  infrastructure: [],
  api: [],
  aop: [],
})
export class DemoDomain {}
```

|参数|类型|含义|
|:-:|:-:|:-:|
|api|array|全局应用接口模块|
|infrastructure|array|全局基础设施模块|
|aop|array|切面提供者|

## 模块内的通用结构

```bash
.
├── base                    模块公共类
├── common                  模块公共
│   ├── abstract            用于声明抽象类
│   ├── constant            用于声明常量
│   ├── declare             用于声明依赖
│   ├── enum                用于声明常量
│   ├── interface           用于声明接口
│   └── type                用于声明类型
├── method                  模块函数方法
├── module                  模块容器和注册表
...
```
