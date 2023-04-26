#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { Command } from "commander"
import inquirer from "inquirer"
import pkg from "../package.json"
import registries from "../registries.json"
import { getOrigin, setOrigin, getHostOrigin } from "./utils/originController.js"
import { formatOutput } from "./utils/formatOutput"

const program = new Command()

program.name("jhy").description("npm镜像源操作命令")

// 查看当前镜像源命令
program
	.command("now")
	.description("查看当前正在使用的镜像源")
	.action(() => {
		const res = getOrigin()
		formatOutput("当前镜像源", res, "success")
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
		const setResult = setOrigin(origin)
		if (setResult.res) {
			formatOutput("镜像源切换", "成功", "success")
		} else {
			formatOutput("镜像源切换", "失败", "error")
			formatOutput("错误信息", `${setResult.error}`, "error")
		}
	})

//	添加自定义镜像源
program
	.command("add")
	.description("添加自定义镜像源")
	.action(async () => {
		const { name, registry } = await inquirer.prompt([
			{
				type: "input",
				name: "name",
				message: "请输入镜像源名称",
				validate(valid) {
					const keys = Object.keys(registries)
					if (keys.includes(valid)) {
						return `镜像源名称${valid}已存在`
					}
					if (!valid.trim()) {
						return "镜像源名称不能为空"
					}
					return true
				},
			},
			{
				type: "input",
				name: "registry",
				message: "请输入镜像源地址",
				validate(valid) {
					if (!valid.trim()) {
						return `镜像源地址不能为空`
					}
					return true
				},
			},
		])

		const value = {
			registry: registry.trim(),
		}
		Reflect.set(registries as object, name, value)

		try {
			fs.writeFileSync(path.join(__dirname, "../registries.json"), JSON.stringify(registries, null, 4))
			formatOutput("添加镜像源", "成功", "success")
		} catch (error) {
			formatOutput("添加镜像源", "失败", "error")
			formatOutput("错误信息", `${error}`, "error")
		}
	})

program.version(pkg.version, "-V,--version", "输出版本号")

program.parse(process.argv)
