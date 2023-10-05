import inquirer from "inquirer"
import ora from "ora"
import download from "download-git-repo"
import templates from "wdt/templates.json"
import { formatOutput } from "utils/formatOutput"

export const wdtInit = async () => {
	const keys = Object.keys(templates)
	if (keys.length === 0) {
		formatOutput("提示信息", "当前无模板", "warning")
		return
	} else {
		const { project, select } = await inquirer.prompt([
			{
				type: "input",
				name: "project",
				message: "请输入项目名称",
				validate(valid) {
					if (!valid.trim()) {
						return `项目名称不能为空`
					}
					return true
				},
			},
			{
				type: "list",
				loop: false,
				name: "select",
				message: "请选择项目模板",
				choices: keys,
			},
		])

		const url = Reflect.get(templates, select).url

		const spinner = ora("Downloading...")
		spinner.start()

		try {
			download(`direct:${url}`, project, { clone: true }, (err: any) => {
				if (err) {
					spinner.fail()
					formatOutput("项目生成", "失败", "error")
					return
				}
				spinner.succeed("Downloaded")
				formatOutput("项目生成", "成功,请执行:", "success")
				console.log(`  cd ${project}`)
				console.log(`  npm install`)
				console.log(`  npm run dev\n\n`)
			})
		} catch (error) {
			formatOutput("错误信息", `${error}`, "error")
		}
	}
}
