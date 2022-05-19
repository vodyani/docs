---
sidebar_position: 9
slug: pipe
title: 管道
---

:::info
管道是具有 `@Injectable()` 装饰器的类。管道应实现 `PipeTransform` 接口。

`PipeTransform<T, R>` 是一个通用接口，其中 T 表示 `value` 的类型，R 表示 `transform()` 方法的返回类型。
:::

![](https://docs.nestjs.com/assets/Pipe_1.png)

## 管道 transform

> 每个管道必须实现 `transform()` 方法。 这个方法有两个参数：

```typescript
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```

- value
- metadata

`value` 是当前处理的参数，而 `metadata` 是其元数据。元数据对象包含一些属性：

```typescript
export interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  metatype?: Type<unknown>;
  data?: string;
}
```

|参数|描述|
|:-:|:-:|
|type|告诉我们该属性是一个 body @Body()，query @Query()，param @Param() 还是自定义参数 在这里阅读更多|
|metatype|属性的元类型，例如 String。 如果在函数签名中省略类型声明，或者使用原生 JavaScript，则为 undefined|
|data|传递给装饰器的字符串，例如 @Body('string')。 如果您将括号留空，则为 undefined|

## 管道类型

管道有两个类型:

- **转换**：管道将输入数据转换为所需的数据输出
- **验证**：对输入数据进行验证，如果验证成功继续传递; 验证失败则抛出异常;

### Controller 转换管道

声明一个用于转换 ID 的管道
```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

接下来，我们可以在 Controller 中使用转换管道

```typescript
@Get(':id')
async findOne(@Param('id', new ParseIntPipe()) id) {
  return await this.catsService.findOne(id);
}
```

### Controller 验证管道

声明数据传输对象

```typescript
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @Expose() @IsString()
  name: string;

  @Expose() @IsInt()
  age: number;

  @Expose() @IsString()
  breed: string;
}
```

声明验证管道

```typescript
import { isBuffer, isArrayBuffer } from 'lodash';
import { isValid, isValidObject, isValidStream, toValidateClass } from '@vodyani/validator';
import { ArgumentMetadata, Injectable, PipeTransform, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class DtoValidatePipe implements PipeTransform<any> {
  public async transform(data: any, argument: ArgumentMetadata) {
    if (isValidStream(data) || isBuffer(data) || isArrayBuffer(data)) {
      return data;
    }

    if (isValidObject(argument) && isValid(argument.metatype)) {
      const errorMessage = await toValidateClass(argument.metatype, data);

      if (errorMessage) {
        throw new UnauthorizedException(errorMessage);
      }
    }

    return data;
  }
}
```

接下来，我们可以在 Controller 中使用验证管道

```typescript
@Post()
async create(@Body(new DtoValidatePipe()) createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

## 绑定管道

### 在 Controller 中绑定管道

使用 `@UsePipes()` 装饰器并创建一个管道实例。

```typescript
@Post()
@UsePipes(new JoiValidationPipe(createCatSchema))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

### 在应用接口层模块注册器中绑定管道

```typescript
import { ApiModule } from '@vodyani/core';

@ApiModule({
  aop: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class DemoApi {}
```

### 在全局模块注册器中绑定管道

```typescript
import { ContainerModule } from '@vodyani/core'';

@ContainerModule({
  aop: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class CoreContainer {}
```

### 在应用启动器中绑定管道

```typescript
const app = await NestFactory.create(AppModule);

app.useGlobalPipes(new ValidationPipe());

// ... do something
```