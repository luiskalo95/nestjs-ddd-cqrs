import { Warehouse, WarehouseProperties } from '../../../domain/aggregates/warehouse/warehouse';
import { WarehouseEntity } from '../../entities/warehouse/warehouse.entity';
import { WarehouseVO } from '../../../domain/value-objects/warehouse/warehouse-id.vo';

export class WarehouseDTO {
    public static fromDomainToData(warehouse: Warehouse): WarehouseEntity {

        const warehouseEntity = new WarehouseEntity();
        warehouseEntity.warehouseId = warehouse.properties().warehouseId.props.value;
        warehouseEntity.name = warehouse.properties().name;
        warehouseEntity.city = warehouse.properties().city;
        warehouseEntity.totalMilkBags = warehouse.properties().totalMilkBags;
        warehouseEntity.fixedMilkPrice = warehouse.properties().fixedMilkPrice;
        warehouseEntity.country = warehouse.properties().country;
        warehouseEntity.demand = warehouse.properties().demand;
        warehouseEntity.status = warehouse.properties().status;
        warehouseEntity.noBranchesSubscribed = warehouse.properties().noBranchesSubscribed;
        warehouseEntity.totalProfits = warehouse.properties().totalProfits;
        warehouseEntity.createdAt = warehouse.properties().createdAt;
        warehouseEntity.updatedAt = warehouse.properties().updatedAt;
        warehouseEntity.deletedAt = warehouse.properties().deletedAt;
        return warehouseEntity;
    }

    public static fromDataToDomainUnique(warehouseEntity: WarehouseEntity): Warehouse {
        const result = WarehouseVO.create(warehouseEntity.warehouseId);
        if (result.isOk()) {
            const warehouseProperties: WarehouseProperties = WarehouseDTO.generateWarehouse(result.value, warehouseEntity);
            return new Warehouse(warehouseProperties);
        } else {
            return null;
        }
    }

    public static fromDataToDomainList(warehouseEntities: WarehouseEntity[]): Warehouse[] {
        const warehouses = warehouseEntities.map(warehouse => {
            const result = WarehouseVO.create(warehouse.warehouseId);
            if (result.isOk()) {
                const warehouseProperties: WarehouseProperties = WarehouseDTO.generateWarehouse(result.value, warehouse);
                return new Warehouse(warehouseProperties);
            } else {
                return null;
            }
        })
        return warehouses;
    }

    private static generateWarehouse(id: WarehouseVO, warehouseEntity: WarehouseEntity) {
        return {
            warehouseId: id,
            name: warehouseEntity.name,
            city: warehouseEntity.city,
            totalMilkBags: warehouseEntity.totalMilkBags,
            fixedMilkPrice: warehouseEntity.fixedMilkPrice,
            country: warehouseEntity.country,
            demand: warehouseEntity.demand,
            status: warehouseEntity.status,
            noBranchesSubscribed: warehouseEntity.noBranchesSubscribed,
            totalProfits: warehouseEntity.totalProfits
        };
    }
}