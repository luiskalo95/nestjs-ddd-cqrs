import { Store } from '../../../domain/aggregates/store/store';

export interface IStoreUpdateResponse {
    warehouseId: string;
    storeId: string;
    name: string;
    neighborhood: string;
    noBagMilksToSale: number;
    percentValuePerMilkBag: number;
    salesValue: number;
}

export class StoreUpdateResponse {
    static fromDomainToResponse(store: Store): IStoreUpdateResponse {
        return {
            storeId: store.properties().storeId.value,
            warehouseId: store.properties().warehouseId.value,
            name: store.properties().name,
            neighborhood: store.properties().neighborhood,
            noBagMilksToSale: store.properties().noBagMilksToSale,
            percentValuePerMilkBag: store.properties().percentValuePerMilkBag,
            salesValue: store.properties().salesValue,
        };
    }
}
