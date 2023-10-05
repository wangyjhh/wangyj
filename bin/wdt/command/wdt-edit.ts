import fs from "node:fs"
import path from "node:path"
import inquirer from "inquirer"
import templates from "wdt/templates.json"
import { formatOutput } from "utils/formatOutput"

export const wdtEdit = async () => {
	const keys = Object.keys(templates)
	if (keys.length === 0) {
		formatOutput("提示信息", "当前无项目模板", "warning")
		return
	} else {
		const { name, newname, newurl } = await inquirer.prompt([
			{
				type: "list",
				loop: false,
				name: "name",
				message: "请选择要修改的模板",
				choices: keys,
			},
			{
				type: "input",
				name: "newname",
				message: "请输入新名称 (不填视为不修改)",
				validate(valid) {
					if (keys.includes(valid)) {
						return `模板${valid}已存在`
					}

					return true
				},
			},
			{
				type: "input",
				name: "newurl",
				message: "请输入新模板地址 (不填视为不修改)",
			},
		])

		if (newname == "" && newurl !== "") {
			Reflect.set(templates, name, { url: newurl })
		} else if (newname !== "" && newurl == "") {
			Reflect.set(templates, newname, Reflect.get(templates, name))
			Reflect.deleteProperty(templates, name)
		} else if (newname !== "" && newurl !== "") {
			Reflect.set(templates, newname, { url: newurl })
			Reflect.deleteProperty(templates, name)
		}

		try {
			fs.writeFileSync(path.join(__dirname, "../templates.json"), JSON.stringify(templates, null, 4))
			formatOutput("模板修改", "成功", "success")
		} catch (error) {
			formatOutput("模板修改", "失败", "error")
			formatOutput("错误信息", `${error}`, "error")
		}
	}
}
