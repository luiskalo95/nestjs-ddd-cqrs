import { Store, StoreProperties } from '../../../domain/aggregates/store/store';
import { StoreEntity } from '../../entities/store/store.entity';
import { StoreVO } from '../../../domain/value-objects/store/store-id.vo';
import { WarehouseVO } from '../../../domain/value-objects/warehouse/warehouse-id.vo';

export class StoreDTO {
    public static fromDomainToData(store: Store): StoreEntity {
        const storeEntity = new StoreEntity();
        storeEntity.storeId = store.properties().storeId.props.value;
        storeEntity.warehouseId = store.properties().warehouseId.props.value;
        storeEntity.name = store.properties().name;
        storeEntity.neighborhood = store.properties().neighborhood;
        storeEntity.noBagMilksToSale = store.properties().noBagMilksToSale;
        storeEntity.status = store.properties().status;
        storeEntity.percentValuePerMilkBag = store.properties().percentValuePerMilkBag;
        storeEntity.salesValue = store.properties().salesValue;
        storeEntity.createdAt = store.properties().createdAt;
        storeEntity.updatedAt = store.properties().updatedAt;
        storeEntity.deletedAt = store.properties().deletedAt;
        return storeEntity;
    }

    public static fromDataToDomainUnique(storeEntity: StoreEntity): Store {
        const result1 = StoreVO.create(storeEntity.storeId);
        const result2 = WarehouseVO.create(storeEntity.warehouseId);
        if (result1.isOk() && result2.isOk()) {
            const storeProperties: StoreProperties = StoreDTO.generateStore(result1.value,
                result2.value, storeEntity);
            return new Store(storeProperties);
        } else {
            return null;
        }
    }

    public static fromDataToDomainList(storeEntities: StoreEntity[]): Store[] {
        const stores = storeEntities.map(store => {
            const result1 = StoreVO.create(store.storeId);
            const result2 = WarehouseVO.create(store.warehouseId);
            if (result1.isOk() && result2.isOk()) {
                const storeProperties: StoreProperties = StoreDTO.generateStore(result1.value,
                    result2.value, store);
                return new Store(storeProperties);
            } else {
                return null;
            }
        })
        return stores;
    }

    private static generateStore(idStore: StoreVO, idWarehouse: WarehouseVO, storeEntity: StoreEntity): StoreProperties {
        return {
            storeId: idStore,
            warehouseId: idWarehouse,
            name: storeEntity.name,
            neighborhood: storeEntity.neighborhood,
            noBagMilksToSale: storeEntity.noBagMilksToSale,
            status: storeEntity.status,
            percentValuePerMilkBag: storeEntity.percentValuePerMilkBag,
            salesValue: storeEntity.salesValue
        };
    }
}