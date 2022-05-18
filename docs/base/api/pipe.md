---
sidebar_position: 9
slug: pipe
title: 管道
---

:::info
管道是具有 `@Injectable()` 装饰器的类。管道应实现 `PipeTransform` 接口。
:::

![](https://docs.nestjs.com/assets/Pipe_1.png)

管道有两个类型:

- **转换**：管道将输入数据转换为所需的数据输出
- **验证**：对输入数据进行验证，如果验证成功继续传递; 验证失败则抛出异常;