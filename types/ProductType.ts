type MetadataType = {
	features: string
}

export type ProductType = {
	id: string
	name: string
	unit_amount: number | null
	quantity?: number | 1
	image: string
	metadata: MetadataType
	description: string | null
}
