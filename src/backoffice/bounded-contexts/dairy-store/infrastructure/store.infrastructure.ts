import { err, ok, Result } from "neverthrow";
import { Inject } from "@nestjs/common";
import { AppService } from "src/app.service";
import { Store } from '../domain/aggregates/store/store';
import { StoreRepository } from '../domain/repositories/store/store.repository';
import { StoreCreatedDatabaseException } from './exceptions/store/store-created';
import { StoreListDatabaseException } from './exceptions/store/store-listed';
import { StoreDTO } from './dtos/store/store.dto';
import { StoreEntity } from './entities/store/store.entity';
import { StoreFindByIdDatabaseException } from './exceptions/store/store-findbyid';
import { StoreNotFoundException } from './exceptions/store/store-notfound';
import { StoreListByWarehouseIdDatabaseException } from './exceptions/store/store-listedbywarehouseid';
import { StoreVO } from '../domain/value-objects/store/store-id.vo';
import { WarehouseVO } from '../domain/value-objects/warehouse/warehouse-id.vo';
import { StoreFactory } from '../domain/aggregates/store/storefactory';

export type StoreCreatedResult = Result<Store, StoreCreatedDatabaseException>
export type StoreListResult = Result<Store[], StoreListDatabaseException>
export type StoreFindByIdResult = Result<Store, StoreFindByIdDatabaseException | StoreNotFoundException>
export type StoreListByWarehouseIdResult = Result<Store[], StoreListByWarehouseIdDatabaseException>

export class StoreInfrastructure implements StoreRepository {

    constructor(@Inject(StoreFactory) private storeFactory: StoreFactory) { }

    public async save(store: Store): Promise<StoreCreatedResult> {
        try {
            const storeEntity = StoreDTO.fromDomainToData(store);
            const storeSaved = await AppService.manager.getRepository(StoreEntity).save(storeEntity);
            // return ok(StoreDTO.fromDataToDomainUnique(storeSaved));
            return ok(this.reconstitute(storeSaved));
        } catch (error) {
            console.log(error);
            return err(new StoreCreatedDatabaseException(error.sqlMessage));
        }
    }

    public async list(status: boolean): Promise<StoreListResult> {
        try {
            const stores = await AppService.manager.getRepository(StoreEntity).find({ where: { status }, loadEagerRelations: true });
            return ok(StoreDTO.fromDataToDomainList(stores));
        } catch (error) {
            console.log(error);
            return err(new StoreListDatabaseException(error.sqlMessage));
        }
    }

    public async findById(id: string): Promise<StoreFindByIdResult> {
        try {
            const store = await AppService.manager.getRepository(StoreEntity).findOne({ where: { 'storeId': id } })
            if (!store) return err(new StoreNotFoundException());
            // return ok(StoreDTO.fromDataToDomainUnique(store));
            return ok(this.reconstitute(store));
        } catch (error) {
            console.log(error);
            return err(new StoreFindByIdDatabaseException(error.sqlMessage));
        }
    }

    public async listByWarehouseId(warehouseId: string): Promise<StoreListResult> {
        try {
            const stores = await AppService.manager.getRepository(StoreEntity).find({ where: { warehouseId, status: true } });
            return ok(StoreDTO.fromDataToDomainList(stores));
        } catch (error) {
            console.log(error);
            return err(new StoreListByWarehouseIdDatabaseException(error.sqlMessage));
        }
    }

    public reconstitute(storeEntity: StoreEntity): Store {
        const storeId = StoreVO.create(storeEntity.storeId);
        const warehouseId = WarehouseVO.create(storeEntity.warehouseId);
        if (storeId.isErr() || warehouseId.isErr()) {
            return null;
        }
        return this.storeFactory.reconstitute({
            storeId: storeId.value,
            warehouseId: warehouseId.value,
            name: storeEntity.name,
            neighborhood: storeEntity.neighborhood,
            noBagMilksToSale: storeEntity.noBagMilksToSale,
            status: storeEntity.status,
            percentValuePerMilkBag: storeEntity.percentValuePerMilkBag,
            salesValue: storeEntity.salesValue
        });
    }

}