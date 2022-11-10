import { Store } from '../../aggregates/store/store';
import { StoreCreatedResult, StoreListResult, StoreFindByIdResult, StoreListByWarehouseIdResult } from '../../../infrastructure/store.infrastructure';


export interface StoreRepository {
    save(store: Store): Promise<StoreCreatedResult>;
    list(status: boolean): Promise<StoreListResult>;
    findById(id: string): Promise<StoreFindByIdResult>;
    listByWarehouseId(id: string): Promise<StoreListByWarehouseIdResult>
}