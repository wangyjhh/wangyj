import templates from "wdt/templates.json"

export const wdtList = () => {
	const keys = Object.keys(templates)
	const templatesList: { name: string; registry: string }[] = []
	keys.forEach((k) => {
		templatesList.push({ name: k, registry: Reflect.get(templates, k).url })
	})
	console.table(templatesList)
}
