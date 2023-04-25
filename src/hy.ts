#!/usr/bin/env node
import { Command } from "commander"
import chalk from "chalk"
import { execSync } from "node:child_process"
import pkg from "../package.json" assert { type: "json" }
import registries from "../registries.json" assert { type: "json" }

const program = new Command()

const getOrigin = () => {
	return execSync("npm get registry", { encoding: "utf-8" })
}

program.name("jhy").description("npm镜像源操作命令")

// 查看当前镜像源命令
program
	.command("now")
	.description("查看当前正在使用的镜像源")
	.action(() => {
		const res = getOrigin()
		console.log(chalk.greenBright.bold(res))
	})
// 查看默认镜像源列表
program
	.command("ls")
	.description("默认镜像源列表")
	.action(() => {
		const keys = Object.keys(registries)
		const registriesList: { name: string; registry: string }[] = []
		keys.forEach((k) => {
			registriesList.push({ name: k, registry: Reflect.get(registries as object, k).registry })
		})
		console.table(registriesList)
	})

program.version(pkg.version, "-V,--version", "输出版本号")

program.parse(process.argv)
