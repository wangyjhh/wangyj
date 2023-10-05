import fs from "node:fs"
import path from "node:path"
import inquirer from "inquirer"
import templates from "wdt/templates.json"
import { formatOutput } from "utils/formatOutput"

export const wdtRemove = async () => {
	const keys = Object.keys(templates)
	if (keys.length === 0) {
		formatOutput("提示信息", "当前无模板", "warning")
		return
	} else {
		const { select, confirm } = await inquirer.prompt([
			{
				type: "list",
				loop: false,
				name: "select",
				message: "请选择模板",
				choices: keys,
			},
			{
				type: "confirm",
				name: "confirm",
				message: "是否删除模板",
				default: false,
			},
		])

		if (!confirm) {
			formatOutput("模板删除", "取消", "warning")
			return
		}

		Reflect.deleteProperty(templates, select)

		try {
			fs.writeFileSync(path.join(__dirname, "../templates.json"), JSON.stringify(templates, null, 4))

			formatOutput("模板删除", "成功", "success")
		} catch (error) {
			formatOutput("模板删除", "失败", "error")
			formatOutput("错误信息", `${error}`, "error")
		}
	}
}
