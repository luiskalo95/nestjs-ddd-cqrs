import { AggregateRoot } from "@nestjs/cqrs";
import { WarehouseVO } from "../../value-objects/warehouse/warehouse-id.vo";

export type DEMAND_TYPE = "HIGH" | "LOW";

export type WarehouseEssential = {
    readonly warehouseId: WarehouseVO;
    readonly name: string;
    readonly city: string;
    readonly totalMilkBags: number;
    readonly fixedMilkPrice: number;
}

export type WarehouseOptional = {
    readonly country: string;
    readonly demand: DEMAND_TYPE;
    readonly status: boolean;
    readonly noBranchesSubscribed: number;
    readonly totalProfits: number;
}

export type WarehouseUpdate = {
    readonly name: string;
    readonly status: boolean;
    readonly city: string;
    readonly demand: DEMAND_TYPE;
    readonly totalMilkBags: number;
    readonly fixedMilkPrice: number;
    readonly totalProfits: number;
    readonly noBranchesSubscribed: number;
}

export type WarehouseProperties = Required<WarehouseEssential> & Partial<WarehouseOptional>;

export class Warehouse extends AggregateRoot {

    private readonly warehouseId: WarehouseVO;
    private name: string
    private city: string
    private totalMilkBags: number
    private fixedMilkPrice: number
    private country: string;
    private demand: DEMAND_TYPE;
    private status: boolean;
    private noBranchesSubscribed: number;
    private totalProfits: number;
    private readonly createdAt: Date;
    private updatedAt: Date;
    private deletedAt: Date;

    constructor(properties: WarehouseProperties) {
        super();
        Object.assign(this, properties);
        this.createdAt = new Date();
        this.status = properties.status || true;
        this.demand = properties.demand || 'HIGH';
        this.country = properties.country || 'Colombia';
        this.noBranchesSubscribed = properties.noBranchesSubscribed || 0;
        this.totalProfits = properties.totalProfits || 0;
    }

    public properties() {
        return {
            warehouseId: this.warehouseId,
            name: this.name,
            city: this.city,
            totalMilkBags: this.totalMilkBags,
            fixedMilkPrice: this.fixedMilkPrice,
            country: this.country,
            demand: this.demand,
            status: this.status,
            noBranchesSubscribed: this.noBranchesSubscribed,
            totalProfits: this.totalProfits,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt
        }
    }

    public update(fields: Partial<WarehouseUpdate>): void {
        Object.assign(this, fields);
        this.updatedAt = new Date();
    }

    public delete(): void {
        this.status = false;
        this.deletedAt = new Date();
    }


}