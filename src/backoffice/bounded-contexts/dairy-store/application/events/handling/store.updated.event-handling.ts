import { Inject, InternalServerErrorException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StoreUpdatedEvent } from '../../../domain/events/store.updated.event';
import { WarehouseRepository } from '../../../domain/repositories/warehouse/warehouse.repository';
import { WarehouseInfrastructure } from '../../../infrastructure/warehouse.infrastructure';
import { StoreInfrastructure } from '../../../infrastructure/store.infrastructure';
import { StoreRepository } from '../../../domain/repositories/store/store.repository';

@EventsHandler(StoreUpdatedEvent)
export class StoreUpdatedHandler implements IEventHandler<StoreUpdatedEvent>
{
    constructor(@Inject(WarehouseInfrastructure) private warehouseRepository: WarehouseRepository,
        @Inject(StoreInfrastructure) private storeRepository: StoreRepository,
    ) { }

    public async handle(event: StoreUpdatedEvent) {
        console.log('SessionUpdatedEvent', event);
        const storeResult = await this.storeRepository.listByWarehouseId(
            event.warehouseId.props.value,
        );

        if (storeResult.isErr()) {
            throw new InternalServerErrorException(
                storeResult.error.message,
                storeResult.error.name,
            );
        }

        const stores = storeResult.value;
        const totalProfits = stores.reduce((total, store) => total + store.properties().salesValue, 0);

        const warehouseResult = await this.warehouseRepository.findById(event.warehouseId.value);

        if (warehouseResult.isErr()) {
            throw new InternalServerErrorException(
                warehouseResult.error.message,
                warehouseResult.error.name,
            );
        }

        const warehouse = warehouseResult.value;
        warehouse.update({ totalProfits });

        const updatedResult = await this.warehouseRepository.save(warehouse);
        if (updatedResult.isErr()) {
            throw new InternalServerErrorException(
                updatedResult.error.message,
                updatedResult.error.name,
            );
        }
    }
}
