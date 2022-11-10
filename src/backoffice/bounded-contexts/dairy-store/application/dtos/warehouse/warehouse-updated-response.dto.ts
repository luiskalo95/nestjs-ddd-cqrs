import { Warehouse } from '../../../domain/aggregates/warehouse/warehouse';

export interface IWarehouseUpdateResponse {
    warehouseId: string;
    name: string;
    city: string;
    status: boolean;
    demand: string;
    totalMilkBags: number;
    fixedMilkPrice: number;
}

export class WarehouseUpdateResponse {
    static fromDomainToResponse(warehouse: Warehouse): IWarehouseUpdateResponse {
        return {
            warehouseId: warehouse.properties().warehouseId.value,
            name: warehouse.properties().name,
            city: warehouse.properties().city,
            status: warehouse.properties().status,
            demand: warehouse.properties().demand,
            totalMilkBags: warehouse.properties().totalMilkBags,
            fixedMilkPrice: warehouse.properties().fixedMilkPrice,
        };
    }
}
