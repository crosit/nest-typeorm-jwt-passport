
import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,DeleteDateColumn,ManyToOne} from "typeorm";
import { Profile } from "./profiles.entities";
import { Element } from "./elements.entities";
@Entity({name: "permissions"})
export class Permission {
    @PrimaryGeneratedColumn({type: "int"})
    id: number;
    @Column()
    read: boolean;
    @Column()
    write: boolean;
    @Column()
    update: boolean;
    @Column()
    delete: boolean;
    
    @ManyToOne(() => Profile)
    profile: Profile[];
    @ManyToOne(() => Element)
    element: Element[];
}