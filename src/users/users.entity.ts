import { Exclude } from 'class-transformer';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

export type NameDetails = {
    first: string;
    last: string;
}

@Entity('user')
export class User {
    @Exclude()
    @ObjectIdColumn({ type: 'string' })
    _id: string;

    @Column()
    name: NameDetails;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ nullable: true })
    passwordResetId: string;

    get fullName (): string { 
        return `${this.name.first} ${this.name.last}`;
    }

    @Column()
    enrollmentDate: string;

    @Column({ nullable: true })
    readinessAssessment: number;

    @Column()
    githubHandle: string;
}

export type UserJwtJson  = {
    name: NameDetails;
    email: string;
    iat: number;
    exp: number;
}