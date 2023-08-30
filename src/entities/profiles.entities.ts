import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,DeleteDateColumn,OneToMany,ManyToMany,JoinTable} from "typeorm";
import { User } from "./users.entities";
import { Element } from "./elements.entities";    
import { Permission } from "./permissions.entities";

@Entity({name: "profiles"})
export class Profile {
    @PrimaryGeneratedColumn({type: "int"})
    id: number;
    @Column()
    name: string;
    

    // logical delete
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @DeleteDateColumn()
    deletedDate: Date

    @OneToMany(() => User, user => user.profile)
    users: User[];
    @ManyToMany(() => Element)
    @JoinTable()
    elements: Element[];
    @OneToMany(() => Permission, permission => permission.profile)
    permissions: Permission[];
}