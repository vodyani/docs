---
sidebar_position: 1
slug: controller
title: 控制器
---

:::info
`Controller` 控制器是 **Vodyani** 服务中的请求处理者，`Controller` 的概念继承自 **Nest.js**。
:::

![](../../../static/img/Controllers_1.png)

控制器的目的是接收应用的特定请求。通常，每个控制器有多个路由，不同的路由可以执行不同的操作。

## 声明路由和路径

:::info
可以在这里查看更多关于 [Restful](https://restfulapi.cn/) 的知识。

**Nest.js** 为所有标准的 `HTTP` 方法提供了相应的装饰器：`@Get()、@Post()、@Put()、@Delete()、@Patch()、@Options()、@Head()`。此外，`@All()` 则用于定义一个用于处理所有 `HTTP` 请求方法的处理程序。
:::

1. 声明一个被 `Controller 装饰器` 包裹的控制器类，并为控制器声明一个基础的通用路由前缀，然后这个前缀可以以 `host + /cats` 的形式被访问。

2. 声明一个被 `Get` 或其他 `Restful 请求装饰器` 包裹的类方法，并为这个方法声明一个独特的路由前缀，然后这个路由可以以 `host + /cats/find` 的形式被访问。

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get('find')
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

当方法被成功调用，并且返回结果时将会将返回 `200` 状态代码和相关的响应（**POST 请求除外**）。下面我们将介绍如何处理返回响应：

1. **标准响应**，当请求处理程序返回一个 JavaScript 对象或数组时，它将自动序列化为 JSON。但是，当它返回一个 JavaScript 基本类型（例如string、number、boolean）时， Nest.js 将只发送值，而不尝试序列化它。这使响应处理变得简单：只需要返回值，其余的由 Nest.js 负责。

2. **自定义响应**，我们可以在函数签名处通过 `@Res()` 注入类库特定的响应对象。使用此方法，你就能使用由该响应对象暴露的原生响应处理函数。您可以使用 `response.status(200).send()` 构建响应。

:::info
处理 POST 请求（默认响应状态码为 `201`），可以通过在处理函数外添加 `@HttpCode(...)` 装饰器来修改响应状态码。
:::

```typescript
@Post()
@HttpCode(200)
create() {
  return 'This action adds a new cat';
}
```

## 声明请求头

要指定自定义响应头，可以使用 `@Header()` 装饰器或类库特有的响应对象，并直接调用 `res.header()`。

```typescript
@Post()
@Header('Cache-Control', 'none')
```

## 声明路由重定向

要将响应重定向到特定的 URL，可以使用 `@Redirect()` 装饰器或特定于库的响应对象并直接调用 `res.redirect()`。

`@Redirect()` 装饰器有两个可选参数，`url` 和 `statusCode`。 如果省略，则 `statusCode` 默认为 302。

```typescript
@Get()
@Redirect('https://nestjs.com', 301)
```

有时您可能想动态地决定 HTTP 状态代码或重定向 URL。通过从路由处理方法返回一个如下格式的对象：

```json
{
  "url": string,
  "statusCode": number
}
```

返回的值将覆盖传递给 `@Redirect()` 装饰器的所有参数。 例如：

## 获取请求 [Request](http://expressjs.com/en/api.html#req) 对象

处理程序有时需要访问客户端的请求细节。Nest 提供了对底层平台的请求对象 `request` 的访问方式。我们可以在处理函数的签名中使用 `@Req()` 装饰器，指示 Nest.js 将请求对象注入处理程序。

```typescript
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
```

`Request` 对象代表 `HTTP 请求`，并具有查询字符串，请求参数参数，`HTTP 请求头` 和 `HTTP 请求正文` 的属性（在这里阅读更多）。在多数情况下，不必手动获取它们。 我们可以使用专用的装饰器，比如开箱即用的 `@Body()` 或 `@Query()` 。 下面是 **Nest.js** 提供的装饰器及其代表的 **Express** 对象的对照列表。

|装饰器|Express 对照|
|:-:|:-:|
|@Request()，@Req()|req|
|@Response()，@Res()*|res|
|@Next()|next|
|@Request()，@Req()|req|
|@Session()|req.session|
|Param(key?: string)|req.params/req.params[key]|
|@Body(key?: string)|req.body/req.body[key]|
|@Query(key?: string)|req.query/req.query[key]|
|@Headers(name?: string)|req.headers/req.headers[name]|
|@Ip()|req.ip|
|@HostParam()|req.hosts|
