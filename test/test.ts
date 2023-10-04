import chalk from "chalk"

console.log(chalk.red.bgBlue.bold(" test "))
console.log(chalk.red.bold("test"))
console.log(chalk.rgb(123, 45, 67).underline("Underlined reddish color"))
console.log(chalk.hex("#ddd").bold("Bold gray!"))
console.log(chalk.bgYellow.white(" [镜像源切换] "), chalk.yellow(" 成功 "))

import inquirer from "inquirer"

console.log("Hi, welcome to Node Pizza")

inquirer.prompt([
	{
		prefix: "haha",
		suffix: "hhh",
		type: "list",
		name: "size",
		message: "What size do you need?",
		choices: ["Large", "Medium", "Small"],
		filter(val) {
			return val.toLowerCase()
		},
	},
])
