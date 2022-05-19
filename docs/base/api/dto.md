---
sidebar_position: 3
slug: dto
title: 数据传输对象
---

:::info
`DTO` 数据传输对象是 HTTP 请求数据的载体，`DTO` 是一个对象，它定义了客户端请求时需要哪些数据。
:::

我们可以在 `Api` 模块下创建对应的 `DTO` 类，来声明控制器或消费者所需要的对象。

```typescript
import { Expose } from '@vodyani/transformer';

export class DemoDto {
  @Expose()
  public id: number;
}
```

之后，我们可以在 `Controller` 中使用新创建的 `DTO`

```typescript
@Post()
async create(@Body() dto: DemoDto) {
  return 'success';
}
```
