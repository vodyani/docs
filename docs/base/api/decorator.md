---
sidebar_position: 6
slug: decorator
title: 装饰器
---

:::info
在很多的编程语言中，装饰器是一个基础实现，但在 JavaScript 世界中，这个概念仍然相对较新。所以为了更好地理解装饰器是如何工作的，你应该看看 [这篇文章](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)。

下面给出一个简单的定义：

ES2016 装饰器是一个表达式，它返回一个可以将目标、名称和属性描述符作为参数的函数。通过在装饰器前面添加一个 `@` 字符并将其放置在你要装饰的内容的最顶部来应用它。可以为类、方法或属性定义装饰器。
:::

## Controller 参数装饰器

Nest.js 提供了一组非常实用的参数装饰器，可以结合 HTTP 路由处理器（route handlers）一起使用。下面的列表展示了 Nest.js 装饰器和原生 Express 中相应对象的映射。

|装饰器|express 对象属性|
|:-:|:-:|
|@Request()，@Req()|req|
|@Response()，@Res()|res|
|@Next()|next|
|@Session()|req.session|
|@Param(param?: string)|req.params / req.params[param]|
|@Body(param?: string)|req.body / req.body[param]|
|@Query(param?: string)|req.query / req.query[param]|
|@Headers(param?: string)|req.headers / req.headers[param]|
|@Ip()|req.ip|
|@HostParam()|req.hosts|

## Controller 自定义装饰器

在 Node.js 中，会经常将需要传递的值加到请求对象的属性中。然后在每个路由处理程序中手动提取它们，使用如下代码：

```typescript
const user = req.user;
```

为了使代码更具可读性和透明性，我们可以创建一个 @User() 装饰器并在所有控制器中使用它。

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
```

现在你可以在 Controller 中方便地使用它。

```typescript
@Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}
```

## 在 Controller 中使用管道

Nest 对待自定义的路由参数装饰器和自身内置的装饰器（@Body()，@Param() 和 @Query()）一样。这意味着管道也会因为自定义注释参数（在本例中为 user 参数）而被执行。此外，你还可以直接将管道应用到自定义装饰器上：

```typescript
@Get()
async findOne(
  @User(new ValidationPipe({ validateCustomDecorators: true })) user: UserEntity,
) {
  console.log(user);
}
```

:::danger 请注意
validateCustomDecorators 选项必须设置为 true。默认情况下，ValidationPipe 不验证使用自定义装饰器注释的参数。
:::

## 聚合 Controller 装饰器

Nest 提供了一种辅助方法来聚合多个装饰器。例如，假设您要将与身份验证相关的所有装饰器聚合到一个装饰器中。这可以通过以下方法实现：

```typescript
import { applyDecorators } from '@nestjs/common';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' })
  );
}
```

然后，你可以参照以下方式使用 @Auth() 自定义装饰器：

```typescript
@Get('users')
@Auth('admin')
findAllUsers() {}
```

:::danger 请注意
来自 @nestjs/swagger 依赖中的 @ApiHideProperty() 装饰器无法聚合，因此此装饰器无法正常使用 applyDecorators 方法。
:::
