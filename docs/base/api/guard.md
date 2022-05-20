---
sidebar_position: 7
slug: guard
title: 守卫
---

:::info
守卫是一个使用 `@Injectable()` 装饰器的类。守卫应该实现 `CanActivate` 接口。

守卫在每个中间件之后执行，但在任何拦截器或管道之前执行。
:::

![](../../../static/img/Guards_1.png)

守卫有一个单独的责任。它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。 这通常称为授权。在传统的 `Express` 应用程序中，通常由中间件处理授权。中间件是身份验证的良好选择。到目前为止，访问限制逻辑大多在中间件内。这样很好，因为诸如 `token` 验证或将 `request` 对象附加属性与特定路由没有强关联。

中间件不知道调用 `next()` 函数后会执行哪个处理程序。另一方面，守卫可以访问 `ExecutionContext` 实例，因此确切地知道接下来要执行什么。它们的设计与异常过滤器、管道和拦截器非常相似，目的是让您在请求/响应周期的正确位置插入处理逻辑，并以声明的方式进行插入。这有助于保持代码的简洁和声明性。

## 守卫 canActivate

> 每个守卫必须实现 `canActivate()` 方法，此函数应该返回一个布尔值，指示是否允许当前请求。它可以同步或异步地返回响应(通过 Promise 或 Observable)，这个方法有一个参数：

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // return validateRequest(request);
  }
}
```

`canActivate()` 函数接收单个参数 `ExecutionContext` 实例。`ExecutionContext` 继承自 `ArgumentsHost` `。ArgumentsHost` 是传递给原始处理程序的参数的包装器，在上面的示例中，我们只是使用了之前在 `ArgumentsHost` 上定义的帮助器方法来获得对请求对象的引用。有关此主题的更多信息。你可以在这里了解到更多(在异常过滤器章节)。

`ExecutionContext` 提供了更多功能，它扩展了 `ArgumentsHost`，但是也提供了有关当前执行过程的更多详细信息。

```typescript
export interface ExecutionContext extends ArgumentsHost {
  getClass<T = any>(): Type<T>;
  getHandler(): Function;
}
```

## 绑定守卫

### 在 Controller 中绑定守卫

使用 `@UseGuards()` 装饰器并传递守卫类，将实例化过程委托给 `Nest.js` 运行时。

```typescript
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {}
```

当然也可以直接传递实例对象。

```typescript
@Controller('cats')
@UseGuards(new RolesGuard())
export class CatsController {}
```

### 在应用接口层模块注册器中绑定守卫

```typescript
import { ApiModule } from '@vodyani/core';

@ApiModule({
  aop: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class DemoApi {}
```

### 在全局模块注册器中绑定守卫

```typescript
import { ContainerModule } from '@vodyani/core'';

@ContainerModule({
  aop: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class CoreContainer {}
```

### 在应用启动器中绑定守卫

```typescript
const app = await NestFactory.create(AppModule);

app.useGlobalGuards(new RolesGuard());

// ... do something
```
