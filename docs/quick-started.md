---
sidebar_position: 1
slug: quick-started
title: 快速开始
---

## 准备工作

> 如果需要帮助，请参考 [如何安装 Node.js 环境](./q&a/how-install-node)。

- 操作系统：支持 MacOS，Linux，Windows。
- 运行环境：建议选择 Node.js [LTS](https://nodejs.org/en/) 版本，最低要求 16.14。

## 🏭 安装和构建

1. 建议您使用 CLI 工具 来简化项目初始化流程，首先执行安装命令：

```bash
npm install -g @vodyani/cli
```

2. 执行 CLI 项目创建命令：

```bash
vodyani new
```

3. CLI 工具会引导您输入项目名，如果没有输入，默认的项目名是 vodyani

```bash
? Enter the name you want to create, if the name has more than one word please use `-` split. (vodyani)
```

4. CLI 工具会引导您安装依赖

```bash
? Do you need auto install all? (Use arrow keys)
❯ yes 
  no 
```

5. 创建完毕

```bash
 __     __   ___    ____   __   __     _      _   _   ___ 
 \ \   / /  / _ \  |  _ \  \ \ / /    / \    | \ | | |_ _|
  \ \ / /  | | | | | | | |  \ V /    / _ \   |  \| |  | | 
   \ V /   | |_| | | |_| |   | |    / ___ \  | |\  |  | | 
    \_/     \___/  |____/    |_|   /_/   \_\ |_| \_| |___|


 vodyani project: vodyani is created 🎉
```

## 🚀 启动服务

最后一步，我们在项目根目录下执行命令：

```bash
npm run start
```

等待片刻，您的第一个 Vodyani 服务就会在 `http://localhost:3000` 成功启动 🎉 ~

## 👋 遇到问题？

<br/>

:::info 👉🏻 [discussions](https://github.com/vodyani/vodyani/discussions)
描述您的问题，并提供尽可能详细的复现方法和场景 😲
:::