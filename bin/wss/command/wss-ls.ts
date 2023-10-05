import registries from "wss/registries.json"

export const wssList = () => {
	const keys = Object.keys(registries)
	const registriesList: { name: string; registry: string }[] = []
	keys.forEach((k) => {
		registriesList.push({ name: k, registry: Reflect.get(registries, k).registry })
	})
	console.table(registriesList)
}
