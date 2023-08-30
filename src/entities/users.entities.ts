import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,DeleteDateColumn,ManyToOne} from "typeorm";
import { Profile } from "./profiles.entities";

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    

    // logical delete
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @DeleteDateColumn()
    deletedDate: Date

    @ManyToOne(() => Profile, profile => profile.users)
    profile: Profile;



}