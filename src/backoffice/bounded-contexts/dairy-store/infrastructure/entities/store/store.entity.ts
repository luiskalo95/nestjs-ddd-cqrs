import { Column, Entity, PrimaryColumn } from "typeorm";
import { BaseEntity } from '../base';

@Entity({name: 'store'})
export class StoreEntity extends BaseEntity {

    @PrimaryColumn({type: 'varchar', length: 40})
    public storeId: string;

    @Column({type: 'varchar', length: 40, nullable: false})
    public name: string;

    @Column({type: 'int', default: 0, nullable: false})
    public noBagMilksToSale: number;

    @Column({type: 'boolean', default: false})
    public status: boolean;

    @Column({type: 'varchar', length: 40, nullable: false})
    public neighborhood: string;

    @Column({type: 'float', default: 0, nullable: false})
    public percentValuePerMilkBag: number;

    @Column({type: 'double', default: 0, nullable: false})
    public salesValue: number;

    @Column({type: 'int', default: 0, nullable: false})
    public totalProfits: number;

    @Column({type: 'varchar', length: 40, nullable: false})
    public warehouseId: string;

}
