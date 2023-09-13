import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,DeleteDateColumn,ManyToOne} from "typeorm";
import { Models } from "./models.entitie";
import { Truck } from "./truckLoad.entities";
@Entity({name: "temp_inventory"})
export class TempInventory {

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

    


    // logical delete
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @DeleteDateColumn()
    deletedDate: Date;

    @ManyToOne(() => Models, model => model.inventory)
    model: Models[];
    @ManyToOne(() => Truck, truck => truck.inventory)
    truck: Truck[];



    
}