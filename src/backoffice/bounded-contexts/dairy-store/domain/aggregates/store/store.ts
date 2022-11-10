import { AggregateRoot } from "@nestjs/cqrs";
import { WarehouseVO } from '../../value-objects/warehouse/warehouse-id.vo';
import { StoreVO } from '../../value-objects/store/store-id.vo';
import { StoreUpdatedEvent } from '../../events/store.updated.event';
import { StoreDeletedEvent } from '../../events/store.deleted.event';

export type StoreEssential = {
    readonly name: string;
    readonly warehouseId: WarehouseVO;
    readonly storeId: StoreVO;
    readonly neighborhood: string;
    readonly noBagMilksToSale: number;
}

export type StoreOptional = {
    readonly status: boolean;
    readonly percentValuePerMilkBag: number;
    readonly salesValue: number;
}

export type StoreUpdate = {
    readonly name: string;
    readonly status: boolean;
    readonly neighborhood: string
    readonly noBagMilksToSale: number
    readonly percentValuePerMilkBag: number
}

export type StoreProperties = Required<StoreEssential> & Partial<StoreOptional>;

export class Store extends AggregateRoot {

    private readonly storeId: StoreVO;
    private name: string;
    private readonly warehouseId: WarehouseVO;
    private neighborhood: string;
    private noBagMilksToSale: number;
    private status: boolean;
    private percentValuePerMilkBag: number;
    private salesValue: number;
    private readonly createdAt: Date;
    private updatedAt: Date;
    private deletedAt: Date;

    constructor(properties: StoreProperties) {
        super();
        Object.assign(this, properties);
        this.createdAt = new Date();
        this.status = properties.status || true;
        this.percentValuePerMilkBag = properties.percentValuePerMilkBag || 0.15;
        this.salesValue = properties.salesValue || 0;
    }

    public properties() {
        return {
            warehouseId: this.warehouseId,
            storeId: this.storeId,
            name: this.name,
            neighborhood: this.neighborhood,
            noBagMilksToSale: this.noBagMilksToSale,
            status: this.status,
            percentValuePerMilkBag: this.percentValuePerMilkBag,
            salesValue: this.salesValue,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt
        }
    }

    public update(fields: Partial<StoreUpdate>): void {
        Object.assign(this, fields);
        this.updatedAt = new Date();
        this.apply(Object.assign(new StoreUpdatedEvent(), this.properties()));
    }

    public delete(): void {
        this.status = false;
        this.deletedAt = new Date();
        this.apply(Object.assign(new StoreDeletedEvent(), this.properties()));
    }


}