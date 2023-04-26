import { execSync } from "node:child_process"

export const getOrigin = () => {
	return execSync("npm get registry", { encoding: "utf-8" })
}

export const setOrigin = (origin: string) => {
	try {
		execSync(`npm config set registry ${origin}`, { encoding: "utf-8" })
		return { res: true }
	} catch (error) {
		return { res: true, error }
	}
}

export const getHostOrigin = (url: string) => {
	const arr = url.split("")
	return arr[arr.length - 1] == "/" ? arr.pop() && arr.join("") : arr.join("")
}
