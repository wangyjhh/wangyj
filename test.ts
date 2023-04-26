import chalk from "chalk"

console.log(chalk.red.bgBlue.bold(" test "))
console.log(chalk.red.bold("test"))
console.log(chalk.rgb(123, 45, 67).underline("Underlined reddish color"))
console.log(chalk.hex("#ddd").bold("Bold gray!"))
console.log(chalk.bgYellow.white(" [镜像源切换] "), chalk.yellow(" 成功 "))
