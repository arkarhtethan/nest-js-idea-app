import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created: Date;

    @Column({
        type: 'text',
        unique: true,
    })
    username: string;

    @Column('text')
    password: string;

    @BeforeInsert()
    async hashPassword () {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject (showToken: boolean = true) {
        const { id, created, username } = this;
        let responseObject: any = { id, username, created };
        if (showToken) {
            responseObject.token = this.token;
        }
        return responseObject;
    }

    async comparePassword (attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }

    private get token () {
        const { id, username } = this;
        return jwt.sign(
            { id, username },
            process.env.SECRET,
            { expiresIn: '7d' }
        )
    }
}