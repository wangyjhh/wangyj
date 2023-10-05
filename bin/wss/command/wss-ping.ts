import ping from "node-http-ping"
import registries from "wss/registries.json"
import { getHostOrigin } from "utils/originController"
import { formatOutput } from "utils/formatOutput"

export const wssPing = async () => {
	const keys = Object.keys(registries)
	keys.forEach(async (k) => {
		const url = getHostOrigin(Reflect.get(registries, k).registry)
		try {
			const time = await ping(url!)
			formatOutput("镜像源测速", `镜像源${k} 响应时间 ${time}ms`, "success")
		} catch (error) {
			formatOutput("镜像源测速", `镜像源${k} 无法访问`, "error")
		}
	})
}
