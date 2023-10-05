import { getOrigin } from "utils/originController"
import { formatOutput } from "utils/formatOutput"

export const wssNow = () => {
	const res = getOrigin()
	formatOutput("当前镜像源", res, "success")
}
