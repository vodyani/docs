---
sidebar_position: -1
slug: provider
title: 提供者
---

:::info
如果说模块是 **Vodyani** 的基石，那么 `Provider` 提供者就是这块基石的重要组成部分。

提供者可以通过类实例化，或者 `token` 注入的方式来建立依赖关系，并且“连接”依赖关系的功能在很大程度上可以委托给 **Nest.js** 运行时。
:::

## 声明提供者

### 标准提供者

声明一个提供者类非常简单，我们只需要为类添加 `@Injectable()` 装饰器即可。

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoProvider {
  get() {
    return 'success';
  }
}
```

### 异步提供者 (useFactory)

> 我们可以借助 [CLI 工具](../other/cli.md) 非常方便的创建异步提供者。

异步提供者需要实现 `ProviderFactory` 接口，异步提供者本质上是 **Nest.js** 中关于工厂提供者的封装。

```typescript
import { FixedContext, ProviderFactory } from '@vodyani/core';

export class DemoManager implements ProviderFactory {
  public static token = Symbol('DemoManager');

  constructor(
    // private readonly options: any,
  ) {
    return {
      inject: [],
      provide: DemoManager.token,
      useFactory: this.useFactory,
    };
  }

  @FixedContext
  private async useFactory() {
    // do something ...
  }
}
```

## 注入提供者

:::tip
异步提供者需要以自身 `token` 属性为标识进行注入。
:::

### 注入到标准提供者

在实例化 `constructor` 中声明。

```typescript
@Injectable()
export class DemoService {
  constructor(
    private readonly provider: DemoProvider,
    @Inject(DemoManager.token) private readonly manager: DemoManager,
  ) {}
}
```

### 可选式地注入到标准提供者

使用 `@Optional` 装饰器。

```typescript
import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(
    @Optional() @Inject(HttpManager.token) private readonly httpClient: T
  ) {}
}
```

### 注入到异步提供者

在 `inject` 中声明。

```typescript
import { FixedContext, ProviderFactory } from '@vodyani/core';

export class DemoService implements ProviderFactory {
  public static token = Symbol('DemoService');

  constructor(
    private readonly options: any,
  ) {}

  constructor(
    // private readonly options: any,
  ) {
    return {
      inject: [
        DemoManager.token,
        DemoProvider,
      ],
      provide: DemoService.token,
      useFactory: this.useFactory,
    };
  }

  @FixedContext
  private async useFactory() {
    // do something ...
  }
}
```

## 注册提供者

### 通用模块注册器

```typescript
import { Module } from '@nestjs/common';

const manager = new DemoManager()

@Module({
  exports: [manager, DemoProvider],
  providers: [manager, DemoProvider],
})
export class DemoModule {}
```

### 应用接口层模块注册器

```typescript
import { ApiModule } from '@vodyani/core';

@ApiModule({
  consumer: [DemoConsumer],
})
export class DemoApi {}
```

### 领域业务模块注册器

```typescript
import { DomainModule } from '@vodyani/core'';

@DomainModule({
  service: [DemoService],
  manager: [DemoManager],
  repository: [DemoRepository],
  provider: [DemoProvider],
  entity: [DemoEntity],
})
export class DemoDomain {}
```
