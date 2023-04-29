type MetadataType = {
	features: string
}

export type AddCartType = {
	id: string
	name: string
	unit_amount: number | null
	quantity?: number | 1
	image: string
	metadata: MetadataType
	description: string | null
}
