import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,DeleteDateColumn,OneToMany} from "typeorm";
import { Inventory } from "./inventory.entities";
@Entity({name: "models"})
export class Models {

    @PrimaryGeneratedColumn({type: "int"})
    id: number;

    @Column()
    brand: string;

    @Column()
    category: string;

    @Column()
    color: string;

    @Column()
    descripcion: string;

    @Column()
    msrp: number;

    @Column()
    serialModel: Date;


    // logical delete
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @DeleteDateColumn()
    deletedDate: Date;
    @OneToMany(type => Inventory, inventory => inventory.model)
    inventory: Inventory[];
    
}