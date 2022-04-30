---
sidebar_position: 1
slug: how-install-node
title: 如何安装 Node.js 环境
---

### 使用场景

一般来说，直接从 [Node.js 官网](https://nodejs.org/)下载对应的安装包，即可完成环境配置，但在**本地开发**的时候，经常需要快速更新或切换版本。

推荐跨平台的 [nvs](https://github.com/jasongin/nvs)。

### 如何安装

#### Linux / macOS 环境

通过 Git Clone 对应的项目即可。

```
$ export NVS_HOME="$HOME/.nvs"
$ git clone https://github.com/jasongin/nvs --depth=1 "$NVS_HOME"
$ . "$NVS_HOME/nvs.sh" install
```

#### Windows 环境

由于 Windows 环境配置比较复杂，所以还是推荐使用 `msi` 文件完成初始化工作。
访问 [nvs/releases](https://github.com/jasongin/nvs/releases) 下载最新版本的 `nvs.msi`，然后双击安装即可。

---

### 配置镜像地址
在国内由于大家都懂的原因，需要把对应的镜像地址修改下：
```
$ nvs remote node https://npmmirror.com/mirrors/node/
$ nvs remote
default             node
chakracore          https://github.com/nodejs/node-chakracore/releases/
chakracore-nightly  https://nodejs.org/download/chakracore-nightly/
nightly             https://nodejs.org/download/nightly/
node                https://nodejs.org/dist/
```

---

### 使用指南
通过以下命令，即可非常简单的安装 Node.js 最新的 LTS 版本。
```bash
# 安装最新的 LTS 版本
$ nvs add lts
# 配置为默认版本
$ nvs link lts
```
安装其他版本：
```bash
# 安装其他版本尝尝鲜
$ nvs add 12
# 查看已安装的版本
$ nvs ls
# 在当前 Shell 切换版本
$ nvs use 12
```
更多指令参见 `nvs --help` 。

---

### 共用 npm 全局模块
使用 `nvs` 时，默认的 `prefix` 是当前激活的 Node.js 版本的安装路径。
带来一个问题是：切换版本之后，之前安装全局命令模块需要重新安装，非常不方便。
解决方案是配置统一的全局模块安装路径到 `~/.npm-global`，如下：
```bash
$ mkdir -p ~/.npm-global
$ npm config set prefix ~/.npm-global
```
还需配置环境变量到 `~/.bashrc` 或 `~/.zshrc` 文件里面：
```bash
$ echo "export PATH=~/.npm-global/bin:$PATH" >> ~/.zshrc
$ source ~/.zshrc
```

---
