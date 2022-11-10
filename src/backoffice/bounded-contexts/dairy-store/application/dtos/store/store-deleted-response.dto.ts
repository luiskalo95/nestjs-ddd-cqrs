import { Store } from '../../../domain/aggregates/store/store';

export interface IStoreDeleteResponse {
    storeId: string;
    ok: boolean;
}

export class StoreDeleteResponse {
    static fromDomainToResponse(store: Store): IStoreDeleteResponse {
        return {
            storeId: store.properties().storeId.value,
            ok: true
        };
    }
}
