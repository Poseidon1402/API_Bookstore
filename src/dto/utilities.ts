export interface ValidationErrorInterface {
    property: string,
    message: object
}

export interface UserObjectInterface {
	code_user: string,
    firstName: string,
	lastName: string,
	email: string,
	birthDate: string,
	role: "CLIENT" | "AUTHOR",
	password: string
}