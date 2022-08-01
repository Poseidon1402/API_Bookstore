import { User } from "../entity/User.entity";

export interface BookObjectForCreation {
    title: string,
	description: string,
	category: string,
	price: number,
	page_number: string,
	language: string,
	bookFileUrl: string,
	user: User 
}

export interface BookObjectForModification {
	title?: string,
	description?: string,
	category?: string,
	price?: number,
	page_number?: string,
	language?: string,
}	