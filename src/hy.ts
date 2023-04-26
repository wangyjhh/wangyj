#!/usr/bin/env node
import { Command } from "commander"
import chalk from "chalk"
import inquirer from "inquirer"
import { execSync } from "node:child_process"
import pkg from "../package.json"
import registries from "../registries.json"

const program = new Command()

const getOrigin = () => {
	return execSync("npm get registry", { encoding: "utf-8" })
}

const setOrigin = (origin: string) => {
	try {
		execSync(`npm config set registry ${origin}`, { encoding: "utf-8" })
		console.log(chalk.bgGreen(" 镜像源切换 "), chalk.green.bold(" 成功 "))
	} catch (error) {
		console.log(chalk.bgRed.white(" 镜像源切换 "), chalk.red.bold(" 错误 "))
		console.log(chalk.bgRed.white(" 错误 "), chalk.red.bold(`${error}`))
	}
}

program.name("jhy").description("npm镜像源操作命令")

// 查看当前镜像源命令
program
	.command("now")
	.description("查看当前正在使用的镜像源")
	.action(() => {
		const res = getOrigin()
		console.log(chalk.bgGreen(" 当前镜像源 "), chalk.green(res))
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

// 切换镜像源
program
	.command("use")
	.description("切换镜像源")
	.action(async () => {
		const { select } = await inquirer.prompt([
			{
				type: "list",
				name: "select",
				message: "请选择镜像源",
				choices: Object.keys(registries),
			},
		])
		const origin = Reflect.get(registries as object, select).registry
		setOrigin(origin)
	})

program.version(pkg.version, "-V,--version", "输出版本号")

program.parse(process.argv)
