---
sidebar_position: 1
slug: api
title: 应用接口层
---

:::tip
在 [工程结构·应用接口层](../strut/intro#应用接口层) 中，我们了解到应用接口层是一个承接，协调的角色。

接下来，我们将逐个讲解应用接口层的组成部分。
:::

## HTTP 路由控制器（Controller）

:::info
HTTP 路由控制器是 Vodyani 服务的最顶层承接者，Controller 的概念继承自 Nest.js。
:::

![](../../static/img/Controllers_1.png)

控制器的目的是接收应用的特定请求。路由机制控制哪个控制器接收哪些请求。通常，每个控制器有多个路由，不同的路由可以执行不同的操作。

## 消费者（Consumer）

## 数据传输对象（DTO）

## 数据返回对象（VO）

## 切面提供者（AOP）

### AOP 异常过滤器（filter）
### AOP 装饰器（decorator）
### AOP 守卫（guard）
### AOP 拦截器（interceptor）
### AOP 管道（pipe）