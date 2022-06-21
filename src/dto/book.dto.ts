export interface BookObjectForCreation {
    title: string,
	description: string,
	category: string,
	price: number,
	page_number: string,
	language: string
}

export interface BookObjectForModification {
	title?: string,
	description?: string,
	category?: string,
	price?: number,
	page_number?: string,
	language?: string
}	