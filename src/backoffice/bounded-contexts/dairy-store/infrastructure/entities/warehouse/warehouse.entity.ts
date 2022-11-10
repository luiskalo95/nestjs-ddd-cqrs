import { Column, Entity, PrimaryColumn } from "typeorm";
import { BaseEntity } from '../base';

export type DEMAND_TYPE = "HIGH" | "LOW";

@Entity({ name: 'warehouse' })
export class WarehouseEntity extends BaseEntity {

    @PrimaryColumn({ type: 'varchar', length: 40 })
    public warehouseId: string;

    @Column({ type: 'varchar', length: 40, nullable: false })
    public name: string;

    @Column({ type: 'varchar', length: 40, nullable: false })
    public city: string;

    @Column({ type: 'int', default: 0, nullable: false })
    public totalMilkBags: number;

    @Column({ type: 'int', default: 0, nullable: false })
    public fixedMilkPrice: number;

    @Column({ type: 'varchar', length: 40, nullable: false })
    public country: string;

    @Column({ type: 'varchar', length: 40, nullable: false })
    public demand: DEMAND_TYPE;

    @Column({ type: 'boolean', default: false })
    public status: boolean;

    @Column({ type: 'int', default: 0, nullable: false })
    public noBranchesSubscribed: number;

    @Column({ type: 'int', default: 0, nullable: false })
    public totalProfits: number;

}
