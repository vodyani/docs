---
sidebar_position: 4
slug: vo
title: 数据返回对象
---

:::info
`VO` 数据返回对象是 HTTP 响应数据的载体，`VO` 是一个对象，它定义了服务端响应后需要返回哪些数据。
:::

我们可以在 `Api` 模块下创建对应的 `VO` 类，来声明控制器或消费者所需要的对象。

```typescript
import { Expose } from '@vodyani/transformer';

export class DemoVO {
  @Expose()
  public id: number;
}
```

之后，我们可以在 `Controller` 中使用新创建的 `VO`

```typescript
@Post()
@Assemble(DemoVO)
async create() {
  return { id: 1 };
}
```
