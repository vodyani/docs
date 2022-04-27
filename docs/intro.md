---
sidebar_position: 1
slug: intro
title: 介绍
---

:::tip 什么是 Vodyani ？
**Vodyani 是一个专注于服务端领域的 Node.js 开发脚手架。**

*Vodyani 基于 [Nestjs](https://github.com/nestjs/nest) + [TypeScript](https://github.com/microsoft/TypeScript) 开发，针对服务端开发中的常见场景进行了易用的，友好的封装，并按功能提供了丰富的模块。*
:::

## 准备工作：

> 如果需要帮助，请参考 [如何安装 Node.js 环境](./q&a/how-install-node)。

- 操作系统：支持 macOS，Linux，Windows。
- 运行环境：建议选择 [LTS](https://nodejs.org/en/) 版本，最低要求 12.x。

## 安装：

建议您使用 [CLI 工具](./other/cli)来简化安装流程，只需要在终端执行命令：

```bash
npm install -g @vodyani/cli
```

然后，我们按提示执行命令：

```bash
# 获取帮助
vodyani help

 __     __   ___    ____   __   __     _      _   _   ___
 \ \   / /  / _ \  |  _ \  \ \ / /    / \    | \ | | |_ _|
  \ \ / /  | | | | | | | |  \ V /    / _ \   |  \| |  | |
   \ V /   | |_| | | |_| |   | |    / ___ \  | |\  |  | |
    \_/     \___/  |____/    |_|   /_/   \_\ |_| \_| |___|


vodyani new       =>  🚀 Create a starter project.
vodyani api       =>  🔌 Generate complete api modules in the project.
vodyani domain    =>  🌏 Generate complete domain modules in the project.
vodyani file      =>  🏭 Generate complete file on demand in the project.

# 创建项目
vodyani new
```

## 启动：

最后一步，我们在项目根目录下执行命令：

```bash
# 等待片刻，您的第一个 Vodyani 服务就会在 `http://localhost:3000` 成功启动 🎉 ~
npm run start
```

## 提问：

:::info 👉🏻 [Vodyani Issues](https://github.com/vodyani/vodyani/issues)
1. 描述你的问题，提供尽可能详细的复现方法，框架版本，场景。
2. 尽可能提供报错截图，堆栈信息，最小复现的 repo。
:::