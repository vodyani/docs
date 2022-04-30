---
sidebar_position: 0
slug: intro
title: 介绍
---

:::tip 什么是 Vodyani ？
**Vodyani 是一个专注于解决业务开发的服务端 Node.js 开发脚手架。**

Vodyani 基于 [Nestjs](https://github.com/nestjs/nest) + [TypeScript](https://github.com/microsoft/TypeScript) 开发，针对服务端开发中的常见场景进行了易用的，友好的封装，并按功能提供了丰富的模块。
:::

## 为什么不直接用 Nest.js?

### Nest.js 解决了哪些问题？

Nest.js 非常巧妙的结合了 TS 中的装饰器和反射机制，帮助我们将不同的类来自动注入到框架内部的 IoC 容器，把类的依赖，引用，初始化委托给了 Nest.js 本身。

这样我们就降低了一些隐形的维护成本，比如我们不需要关心以往面向过程式的调用关系。不需要传递复杂的请求上下文，极大程度地降低了代码结构的复杂度，减少了开发人员的心智负担。

### Nest.js 在哪些地方可以做的更好？

在社区内总是将 Nest.js 比作 Java 生态中的 Spring 框架。

但是 Nest.js 只是提供了一个基本的框架和代码组织形式，如果要进行面向业务的开发还是有需要改进的地方，例如：

1. Nest.js 提供的 AOP 机制（过滤器，拦截器，管道，守卫等）只能在控制器(Controller)中使用，提供者(Provider)如果想加入切面机制只能通过开发者自己实现，如自定义装饰器、函数改造等。

2. 数据对象的传输，校验，转换如何处理？在控制器(Controller)中我们可以基于管道和拦截器的特性进行处理，但在提供者(Provider)中呢？

3. 层级如何划分？模块如何划分？模块之间如何进行组织？这些问题其实才是留给使用者最大的挑战。

4. 如何管理配置和配置中心？如何让配置只需要声明一次，就可以在全局进行调用？

5. 如何结合配置中心，使得配置中心的数据更新后，自动重载服务中的客户端提供者（如 MySQL、Redis 等）？

6. 如何在 Nest.js 中使用多线程及线程池来解决实际问题？

## 为什么使用 Vodyani?

### Vodyani 解决了哪些问题？

1. 在 Nest.js v8.x 的基础上，使用 [Core](./advanced/core.md) 针对层级和模块组织方式进行封装，并且引入了业务开发中一些常用的方法。

2. 基于 Nest.js 推荐的 class-transformer + class-validator 进行封装，并提供易用的 [transformer](./advanced/transformer.md) 和 [validator](./advanced/validator.md) 模块，我们可以通过引入这两个模块中定义的装饰器或方法，对提供者提供 AOP 切面功能（转换、校验）

3. 开发了 [Ark](./advanced/ark.md) 配置管理模块，你可以通过定义本地文件 + 定义远程配置中心引入的方式，轻松的管理，读取，写入全局配置。并且 [Core](./advanced/core.md) 中提供了一个通用的客户端适配器接口，通过实现这个接口，你可以轻松的将客户端适配器注入到 Ark 的动态数据源中进行动态部署。

4. 开发了 [Dust](./advanced/dust.md) 线程管理模块，你可以通过注入线程池容器或者直接调用线程的方式，来轻松地管理本地线程。

5. 结合 Nest.js + Nest.js Swagger 封装和定义全局的数据对象，细分为 DTO/DO/VO 三层，分别对应 `输入`，`处理中`，`输出` 这三种业务处理状态。
 
### Vodyani 的未来展望

1. 通过定义一个类似 JDBC 的适配器接口，将需要接入 Vodyani 的客户端实现进行统一封装和管理，让后续更换 新的 ORM 框架，新的客户端实现不再是问题。

2. 基于装饰器开发一个通用的事务提交机制。

3. 基于装饰器开发一个通用的互斥锁机制，提供 Redis 和 Zookeeper 两种实现方案。

### Vodyani 的后续版本规划以及版本管理

1. Vodyani 的版本将始终跟随 Nest.js 进行迭代，除非 Nest.js 不再进行维护。

2. 核心模块与实现都使用统一 `major` 版本号进行管理，升级时将通过 [CLI 工具](./other/cli)进行依赖升级和管理。