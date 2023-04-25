#!/usr/bin/env node

import { Command } from "commander"
import { execSync } from "node:child_process"
import PKG from "../package.json"

const program = new Command()

const getOrigin = () => {
	return execSync("npm get registry", { encoding: "utf-8" })
}

program.name("jhy").description("npm镜像源操作命令")

program
	.command("now")
	.description("查看当前正在使用的镜像源")
	.action(async () => {
		const res = getOrigin()
		console.log(res)
		console.log(PKG.version)
	})

program.version(PKG.version, "-V,--version", "输出版本号")

program.parse(process.argv)

export default program
