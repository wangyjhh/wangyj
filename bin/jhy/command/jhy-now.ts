import { getOrigin } from "utils/originController"
import { formatOutput } from "utils/formatOutput"

export const jhyNow = () => {
	const res = getOrigin()
	formatOutput("当前镜像源", res, "success")
}
