#!/usr/bin/env node
import { Command } from "commander"
import pkg from "package.json"
import { printVersion } from "utils/printVersion"
import { wdtList, wdtAdd, wdtEdit, wdtRemove, wdtInit } from "wdt/command/index"

const program = new Command()

program.name("wdt").description("项目脚手架命令")

// 查看项目模板列表
program.command("ls").description("查看项目模板列表").action(wdtList)

// 添加项目模板
program.command("add").description("添加项目模板").action(wdtAdd)

// 编辑项目模板
program.command("edit").description("编辑项目模板").action(wdtEdit)

// 删除项目模板
program.command("remove").description("删除项目模板").action(wdtRemove)

// 从模板生成新项目
program.command("init").description("从模板生成新项目").action(wdtInit)

program.version(printVersion(pkg.version), "-V, --version", "输出版本号")

program.parse(process.argv)
