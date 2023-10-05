import fs from "node:fs"
import path from "node:path"

const outputDir = "./dist"
const filesToCopy = ["README.md", "LICENSE"]

filesToCopy.forEach((file) => {
	const sourcePath = path.resolve(__dirname, "../", file)
	const destPath = path.resolve(__dirname, "../", outputDir, file)
	fs.copyFileSync(sourcePath, destPath)
})
