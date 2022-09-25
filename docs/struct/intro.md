---
sidebar_position: 1
slug: intro
title: 目录结构
---

```bash
.
├── logs                    服务日志目录
├── public                  静态资源目录（多用于存放静态资源）
├── resource                应用资源目录（多用于存放配置信息）
├── src                     
│   ├── core                核心定义目录
│   ├── infrastructures     基础设施目录
│   ├── modules             应用模块目录
│   ├── container.ts        应用模块容器文件
│   ├── launcher.ts         应用启动器文件
│   └── main.ts             应用入口文件
├── temp                    临时文件目录
└── test                    单元测试目录
```
