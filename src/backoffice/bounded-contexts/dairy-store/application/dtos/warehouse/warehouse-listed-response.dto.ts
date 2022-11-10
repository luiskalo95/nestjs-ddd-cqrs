import { Warehouse } from '../../../domain/aggregates/warehouse/warehouse';

export interface IWarehouseListResponse {
    warehouseId: string;
    name: string;
    city: string;
    demand: string;
    totalMilkBags: number;
    fixedMilkPrice: number;
    noBranchesSubscribed: number;
}

export class WarehouseListResponse {
    static fromDomainToResponse(warehouses: Warehouse[]): IWarehouseListResponse[] {
        const warehousesR: IWarehouseListResponse[] = warehouses.map(warehouse => ({
            warehouseId: warehouse.properties().warehouseId.value,
            name: warehouse.properties().name,
            city: warehouse.properties().city,
            demand: warehouse.properties().demand,
            totalMilkBags: warehouse.properties().totalMilkBags,
            fixedMilkPrice: warehouse.properties().fixedMilkPrice,
            noBranchesSubscribed: warehouse.properties().noBranchesSubscribed
        }))
        return warehousesR;
    }
}

