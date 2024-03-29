#!/usr/bin/env node
import { Command } from "commander"
import pkg from "package.json"
import { printVersion } from "utils/printVersion"
import { wssNow, wssList, wssUse, wssAdd, wssEdit, wssRemove, wssPing } from "wss/command/index"

const program = new Command()

program.name("wss").description("npm镜像源操作命令")

// 查看当前镜像源命令
program.command("now").description("查看当前镜像源").action(wssNow)

// 查看默认镜像源列表
program.command("ls").description("查看镜像源列表").action(wssList)

// 切换镜像源
program.command("use").description("切换镜像源").action(wssUse)

//	添加自定义镜像源
program.command("add").description("添加自定义镜像源").action(wssAdd)

// 编辑自定义镜像源
program.command("edit").description("编辑自定义镜像源").action(wssEdit)

//	删除自定义镜像源
program.command("remove").description("删除自定义镜像源").action(wssRemove)

// 测试镜像源地址速度
program.command("ping").description("测试镜像地址速度").action(wssPing)

program.version(printVersion(pkg.version), "-V, --version", "输出版本号")

program.parse(process.argv)
