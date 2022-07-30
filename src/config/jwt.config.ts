import { User } from "../entity/User.entity"

export const jwtConfig = {
    secret: 'poseidon-web-token',
    data: (user: User): {
        id: string,
        email: string,
        role: "CLIENT" | "AUTHOR"
    } => ({
        id: user.code_user,
        email: user.email,
        role: user.role
    })
}