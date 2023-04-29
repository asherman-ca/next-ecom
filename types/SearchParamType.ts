type Params = {
	id: string
}

type SearchParams = {
	name: string
	image: string
	unit_amount: number | null
	id: string
	features: string
	description: string
}

export type SearchParamType = {
	params: Params
	searchParams: SearchParams
}
