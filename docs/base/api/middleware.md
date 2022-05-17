---
sidebar_position: 5
slug: middleware
title: 中间件
---

:::info
中间件的概念继承自 [Express](http://expressjs.com/en/guide/using-middleware.html)
:::

![](../../../static/img/Middlewares_1.png)

中间件函数可以执行以下任务:

- 在请求前执行一段代码。
- 对请求和响应对象进行更改。
- 调用下一个中间件函数。

## 依赖注入

Nest中间件完全支持依赖注入，就像提供者和控制器一样，它们能够注入属于同一模块的依赖项（通过 constructor）。

## 声明中间件提供者

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```

## Controller 中间件

```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
```

### 设置特定的请求方法

我们还可以在配置中间件时将包含路由路径的对象和请求方法传递给 forRoutes() 方法。我们为之前在 CatsController 中定义的 `/cats` 路由处理程序设置了 LoggerMiddleware。我们还可以在配置中间件时将包含路由路径的对象和请求方法传递给 forRoutes() 方法，从而进一步将中间件限制为特定的请求方法。在下面的示例中，请注意我们导入了 RequestMethod 来引用所需的请求方法类型。

```typescript
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
```

:::tip
可以使用 async/await来实现 configure()方法的异步化(例如，可以在 configure()方法体中等待异步操作的完成)。
:::

### 设置通配符

路由同样支持模式匹配。例如，星号被用作通配符，将匹配任何字符组合。

```typescript
forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
```

以上路由地址将匹配 `abcd` 、 `ab_cd` 、 `abecd` 等。字符 `?` 、 `+` 、 `*` 以及 `()` 是它们的正则表达式对应项的子集。连字符 `(-)` 和点 `(.)` 按字符串路径解析。

### 设置多个中间件

```typescript
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```

### 排除路由

```typescript
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST },
    'cats/(.*)',
  )
  .forRoutes(CatsController);
```

## 函数中间件

我们使用的 LoggerMiddleware 类非常简单。它没有成员，没有额外的方法，没有依赖关系。为什么我们不能只使用一个简单的函数？这是一个很好的问题，因为事实上 - 我们可以做到。这种类型的中间件称为函数式中间件。让我们把 logger 转换成函数。

```typescript
export function logger(req, res, next) {
  console.log(`Request...`);
  next();
};
```

## 全局中间件

如果我们想一次性将中间件绑定到每个注册路由，我们可以使用由INestApplication实例提供的 use()方法：

```typescript
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```