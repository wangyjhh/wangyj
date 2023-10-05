import fs from "node:fs"
import path from "node:path"
import inquirer from "inquirer"
import templates from "wdt/templates.json"
import { formatOutput } from "utils/formatOutput"

export const wdtAdd = async () => {
	const { name, url } = await inquirer.prompt([
		{
			type: "input",
			name: "name",
			message: "请输入模板名称",
			validate(valid) {
				const keys = Object.keys(templates)
				if (keys.includes(valid)) {
					return `模板${valid}已存在`
				}
				if (!valid.trim()) {
					return "模板名称不能为空"
				}
				return true
			},
		},
		{
			type: "input",
			name: "url",
			message: "请输入模板地址",
			validate(valid) {
				if (!valid.trim()) {
					return `模板地址不能为空`
				}
				return true
			},
		},
	])
	const value = {
		url: url.trim(),
	}
	Reflect.set(templates, name, value)

	try {
		fs.writeFileSync(path.join(__dirname, "../templates.json"), JSON.stringify(templates, null, 4))
		formatOutput("模板添加", "成功", "success")
	} catch (error) {
		formatOutput("模板添加", "失败", "error")
		formatOutput("错误信息", `${error}`, "error")
	}
}
