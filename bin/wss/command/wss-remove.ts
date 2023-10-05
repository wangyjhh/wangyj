import fs from "node:fs"
import path from "node:path"
import inquirer from "inquirer"
import registries from "wss/registries.json"
import { formatOutput } from "utils/formatOutput"

export const wssRemove = async () => {
	const defaultList = ["npm", "yarn", "cnpm", "taobao"]
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
}
