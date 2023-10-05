import inquirer from "inquirer"
import registries from "registries.json"
import { setOrigin } from "utils/originController"
import { formatOutput } from "utils/formatOutput"

export const jhyUse = async () => {
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
}
