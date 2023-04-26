import chalk from "chalk"

console.log(chalk.red.bgBlue.bold(" test "))
console.log(chalk.red.bold("test"))
console.log(chalk.rgb(123, 45, 67).underline("Underlined reddish color"))
console.log(chalk.hex("#ddd").bold("Bold gray!"))
console.log(chalk.bgWhite.green.inverse.bold(" 当前镜像源 "))
console.log(chalk.bgRed.bold(" 当前镜像源 "))
