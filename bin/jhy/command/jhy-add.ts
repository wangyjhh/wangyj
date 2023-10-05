import fs from "node:fs"
import path from "node:path"
import inquirer from "inquirer"
import registries from "registries.json"
import { formatOutput } from "utils/formatOutput"

export const jhyAdd = async () => {
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
		fs.writeFileSync(path.join(__dirname, "../../../registries.json"), JSON.stringify(registries, null, 4))
		formatOutput("镜像源添加", "成功", "success")
	} catch (error) {
		formatOutput("镜像源添加", "失败", "error")
		formatOutput("错误信息", `${error}`, "error")
	}
}
