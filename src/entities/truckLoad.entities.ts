import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,DeleteDateColumn,OneToMany} from "typeorm";
import { Inventory } from "./inventory.entities";
@Entity({name: "trucks"})
export class Truck {

    @PrimaryGeneratedColumn({type: "int"})
    id: number;

    @Column()
    controlId: string;

    @Column()
    serial: string;

    @Column()
    storeIn: string;

    @Column()
    loadId: string;

    @Column()
    finalPrice: number;

    @Column()
    sellDate: Date;


    // logical delete
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @DeleteDateColumn()
    deletedDate: Date;

    @OneToMany(() => Inventory, inventory => inventory.truck) 
    inventory: Inventory[];

    
}