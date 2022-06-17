import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryColumn()
    code_user: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    birthDate: Date;

    @Column()
    role: "CLIENT" | "ADMIN" | "AUTOR";

    constructor() {
        this.code_user = this.role[0] + Date.now().toString();
    }
}