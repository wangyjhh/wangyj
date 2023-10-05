import fs from "node:fs"
import path from "node:path"
import inquirer from "inquirer"
import registries from "wss/registries.json"
import { formatOutput } from "utils/formatOutput"

export const wssEdit = async () => {
	const defaultList = ["npm", "yarn", "cnpm", "taobao"]
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
}
