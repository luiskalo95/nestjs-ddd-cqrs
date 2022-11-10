import { IEvent } from '@nestjs/cqrs';
import { StoreProperties } from '../../domain/aggregates/store/store';
import { WarehouseVO } from '../../domain/value-objects/warehouse/warehouse-id.vo';
import { StoreVO } from '../../domain/value-objects/store/store-id.vo';

export class StoreDeletedEvent implements IEvent, StoreProperties {
    public name: string;
    public warehouseId: WarehouseVO;
    public storeId: StoreVO;
    public neighborhood: string;
    public noBagMilksToSale: number;
}