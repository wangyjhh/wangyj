#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { Command } from "commander"
import inquirer from "inquirer"
import ping from "node-http-ping"
import pkg from "../package.json"
import registries from "../registries.json"
import { getOrigin, setOrigin, getHostOrigin } from "./utils/originController.js"
import { formatOutput } from "./utils/formatOutput"

const defaultList = ["npm", "yarn", "tencent", "cnpm", "taobao", "npmMirror"]

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
			registriesList.push({ name: k, registry: Reflect.get(registries, k).registry })
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
				loop: false,
				name: "select",
				message: "请选择镜像源",
				choices: Object.keys(registries),
			},
		])
		const origin = Reflect.get(registries, select).registry
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
		Reflect.set(registries, name, value)

		try {
			fs.writeFileSync(path.join(__dirname, "../registries.json"), JSON.stringify(registries, null, 4))
			formatOutput("镜像源添加", "成功", "success")
		} catch (error) {
			formatOutput("镜像源添加", "失败", "error")
			formatOutput("错误信息", `${error}`, "error")
		}
	})

// 编辑自定义镜像源
program
	.command("edit")
	.description("编辑自定义镜像源")
	.action(async () => {
		const keys = Object.keys(registries)
		if (keys.length === defaultList.length) {
			formatOutput("提示信息", "当前无自定义镜像源", "warning")
			return
		} else {
			const customList = keys.filter((key) => !defaultList.includes(key))
			const { name, newname, newregistry } = await inquirer.prompt([
				{
					type: "list",
					loop: false,
					name: "name",
					message: "请选择要修改的名称",
					choices: customList,
				},
				{
					type: "input",
					name: "newname",
					message: "请输入新名称 (不填视为不修改)",
					validate(valid) {
						if (keys.includes(valid)) {
							return `镜像源名称${valid}已存在`
						}

						return true
					},
				},
				{
					type: "input",
					name: "newregistry",
					message: "请输入新地址 (不填视为不修改)",
					validate(valid) {
						if (keys.includes(valid)) {
							return `镜像源名称${valid}已存在`
						}
						return true
					},
				},
			])

			if (newname == "" && newregistry !== "") {
				Reflect.set(registries, name, { registry: newregistry })
			} else if (newname !== "" && newregistry == "") {
				Reflect.set(registries, newname, Reflect.get(registries, name))
				Reflect.deleteProperty(registries, name)
			} else if (newname !== "" && newregistry !== "") {
				Reflect.set(registries, newname, { registry: newregistry })
				Reflect.deleteProperty(registries, name)
			}

			try {
				fs.writeFileSync(path.join(__dirname, "../registries.json"), JSON.stringify(registries, null, 4))
				formatOutput("镜像源修改", "成功", "success")
			} catch (error) {
				formatOutput("镜像源修改", "失败", "error")
				formatOutput("错误信息", `${error}`, "error")
			}
		}
	})

//	删除自定义镜像源
program
	.command("remove")
	.description("删除自定义镜像源")
	.action(async () => {
		const keys = Object.keys(registries)
		if (keys.length === defaultList.length) {
			formatOutput("提示信息", "当前无自定义镜像源", "warning")
			return
		} else {
			const customList = keys.filter((key) => !defaultList.includes(key))
			const { select, confirm } = await inquirer.prompt([
				{
					type: "list",
					loop: false,
					name: "select",
					message: "请选择自定义镜像源",
					choices: customList,
				},
				{
					type: "confirm",
					name: "confirm",
					message: "是否删除自定义镜像源",
					default: false,
				},
			])

			if (!confirm) {
				formatOutput("镜像源删除", "取消", "warning")
				return
			}

			Reflect.deleteProperty(registries, select)

			try {
				fs.writeFileSync(path.join(__dirname, "../registries.json"), JSON.stringify(registries, null, 4))

				formatOutput("镜像源删除", "成功", "success")
			} catch (error) {
				formatOutput("镜像源删除", "失败", "error")
				formatOutput("错误信息", `${error}`, "error")
			}
		}
	})

// 测试镜像源地址速度
program
	.command("ping")
	.description("测试镜像地址速度")
	.action(async () => {
		const keys = Object.keys(registries)
		keys.forEach(async (k) => {
			const url = getHostOrigin(Reflect.get(registries, k).registry)
			try {
				const time = await ping(url!)
				formatOutput("镜像源测速", `镜像源${k} 响应时间 ${time}ms`, "success")
			} catch (error) {
				formatOutput("镜像源测速", `镜像源${k} 无法访问`, "error")
			}
		})
	})

program.version(pkg.version, "-V,--version", "输出版本号")

program.parse(process.argv)
