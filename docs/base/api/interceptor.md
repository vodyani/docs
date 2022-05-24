---
sidebar_position: 8
slug: interceptor
title: 拦截器
---

:::info
拦截器是使用 `@Injectable()` 装饰器注解的类。拦截器应该实现 `NestInterceptor` 接口。
:::

![](https://docs.nestjs.com/assets/Interceptors_1.png)

拦截器具有一系列有用的功能，这些功能受面向切面编程（AOP）技术的启发。它们可以：

- 在函数执行之前/之后绑定**额外的逻辑**
- 转换从函数返回的结果
- **转换**从函数抛出的异常
- 扩展基本函数行为
- 根据所选条件完全重写函数 (例如, 缓存目的)

## 拦截器 intercept

> 每个拦截器必须实现 `intercept()` 方法。 这个方法有两个参数：

第一个是 `ExecutionContext` 实例（与守卫完全相同的对象）。 `ExecutionContext` 继承自 `ArgumentsHost` 。 `ArgumentsHost` 是传递给原始处理程序的参数的一个包装 ，它根据应用程序的类型包含不同的参数数组。

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
```

## 绑定拦截器

### 在 Controller 中绑定拦截器

使用 `@UseInterceptors()` 装饰器并传递拦截器类，将实例化过程委托给 `Nest.js` 运行时。


```typescript
@UseInterceptors(LoggingInterceptor)
export class CatsController {}
```

当然也可以直接传递实例对象。

```typescript
@UseInterceptors(new LoggingInterceptor())
export class CatsController {}
```

### 在应用接口层模块注册器中绑定拦截器

```typescript
import { ApiModule } from '@vodyani/core';

@ApiModule({
  aop: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
})
export class DemoApi {}
```

### 在全局模块注册器中绑定拦截器

```typescript
import { ContainerModule } from '@vodyani/core'';

@ContainerModule({
  aop: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
})
export class CoreContainer {}
```

### 在应用启动器中绑定拦截器

```typescript
const app = await NestFactory.create(ApplicationModule);
app.useGlobalInterceptors(new LoggingInterceptor());
```