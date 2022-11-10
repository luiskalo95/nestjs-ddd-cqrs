import { err, ok, Result } from "neverthrow";
import { Store, StoreProperties } from './store';
import { WarehouseVO } from '../../value-objects/warehouse/warehouse-id.vo';
import { StoreVO } from '../../value-objects/store/store-id.vo';
import { StoreNameEmptyException } from '../../exceptions/store/store-name-not-empty';
import { StoreNeighborhoodEmptyException } from '../../exceptions/store/store-neighborhood-not-empty';
import { StoreNoBagMilksToSaleEmptyException } from '../../exceptions/store/store-nobagmilkstosale-not-empty';
import { StoreNoBagMilksToSaleNotValidException } from '../../exceptions/store/store-nobagmilkstosale-not-valid';
import { EventPublisher } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { StoreCreatedEvent } from '../../events/store.created.event';

export type StoreFactoryResult = Result<Store, | StoreNameEmptyException | StoreNeighborhoodEmptyException | StoreNoBagMilksToSaleEmptyException | StoreNoBagMilksToSaleNotValidException>;

export class StoreFactory {

  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) { }

  public create(storeId: StoreVO, warehouseId: WarehouseVO, name: string, neighborhood: string, noBagMilksToSale: number): StoreFactoryResult {
    if (name.trim() === '') return err(new StoreNameEmptyException());
    if (neighborhood.trim() === '') return err(new StoreNeighborhoodEmptyException());
    if (!noBagMilksToSale) return err(new StoreNoBagMilksToSaleEmptyException());
    if (noBagMilksToSale <= 0) return err(new StoreNoBagMilksToSaleNotValidException());

    const storeProperties: StoreProperties = { name, neighborhood, noBagMilksToSale, storeId, warehouseId };
    const store = new Store(storeProperties);
    this.eventPublisher.mergeObjectContext(store);
    store.apply(Object.assign(new StoreCreatedEvent(), store.properties()),);
    return ok(store);

  }

  public reconstitute(properties: StoreProperties): Store {
    const store = new Store(properties);
    this.eventPublisher.mergeObjectContext(store);
    return store;
  }

}
