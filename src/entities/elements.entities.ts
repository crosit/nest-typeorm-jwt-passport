import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,DeleteDateColumn,ManyToMany,OneToMany} from "typeorm";
import { Profile } from "./profiles.entities";
import { Permission } from "./permissions.entities";
@Entity({name: "elements"})
export class Element {
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

    @ManyToMany(() => Profile)
    profiles: Profile[];
    @OneToMany(() => Permission, permision => permision.element)
    element: Permission[];
}