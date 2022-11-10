import { IEvent } from "@nestjs/cqrs";
import { StoreProperties } from '../aggregates/store/store';
import { WarehouseVO } from '../value-objects/warehouse/warehouse-id.vo';
import { StoreVO } from '../value-objects/store/store-id.vo';

export class StoreCreatedEvent implements IEvent, StoreProperties {
    public name: string;
    public warehouseId: WarehouseVO;
    public storeId: StoreVO;
    public neighborhood: string;
    public noBagMilksToSale: number;
}