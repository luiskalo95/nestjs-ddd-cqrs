import { Warehouse } from '../../../domain/aggregates/warehouse/warehouse';

export interface IWarehouseDeleteResponse {
    warehouseId: string;
    ok: boolean;
}

export class WarehouseDeleteResponse {
    static fromDomainToResponse(warehouse: Warehouse): IWarehouseDeleteResponse {
        return {
            warehouseId: warehouse.properties().warehouseId.value,
            ok: true
        };
    }
}
