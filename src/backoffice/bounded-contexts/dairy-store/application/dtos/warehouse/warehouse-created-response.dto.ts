import { Warehouse } from '../../../domain/aggregates/warehouse/warehouse';

export interface IWarehouseCreateResponse {
    warehouseId: string;
    name: string;
    city: string;
    status: boolean;
    demand: string;
    totalMilkBags: number;
    fixedMilkPrice: number;
    noBranchesSubscribed: number;
}

export class WarehouseCreateResponse {
    static fromDomainToResponse(warehouse: Warehouse): IWarehouseCreateResponse {
        return {
            warehouseId: warehouse.properties().warehouseId.value,
            name: warehouse.properties().name,
            city: warehouse.properties().city,
            status: warehouse.properties().status,
            demand: warehouse.properties().demand,
            totalMilkBags: warehouse.properties().totalMilkBags,
            fixedMilkPrice: warehouse.properties().fixedMilkPrice,
            noBranchesSubscribed: warehouse.properties().noBranchesSubscribed
        };
    }
}
