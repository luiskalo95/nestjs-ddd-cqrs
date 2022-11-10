import { Store } from '../../../domain/aggregates/store/store';

export interface IStoreListResponse {
    warehouseId: string;
    storeId: string;
    name: string;
    neighborhood: string;
    noBagMilksToSale: number;
    percentValuePerMilkBag: number;
    salesValue: number;
    status: boolean;
}

export class StoreListResponse {
    static fromDomainToResponse(stores: Store[]): IStoreListResponse[] {
        const storesR: IStoreListResponse[] = stores.map(store => ({
            storeId: store.properties().storeId.value,
            warehouseId: store.properties().warehouseId.value,
            name: store.properties().name,
            neighborhood: store.properties().neighborhood,
            status: store.properties().status,
            noBagMilksToSale: store.properties().noBagMilksToSale,
            percentValuePerMilkBag: store.properties().percentValuePerMilkBag,
            salesValue: store.properties().salesValue,
        }))
        return storesR;
    }
}

