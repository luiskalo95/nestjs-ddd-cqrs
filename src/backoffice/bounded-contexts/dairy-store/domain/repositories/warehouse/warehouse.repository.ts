import { Warehouse } from '../../aggregates/warehouse/warehouse';
import { WarehouseCreatedResult, WarehouseListResult, WarehouseFindByIdResult } from '../../../infrastructure/warehouse.infrastructure';

export interface WarehouseRepository {
    save(warehouse: Warehouse): Promise<WarehouseCreatedResult>;
    list(status: boolean): Promise<WarehouseListResult>;
    findById(id: string): Promise<WarehouseFindByIdResult>;
}