import { Inject, InternalServerErrorException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StoreDeletedEvent } from '../../../domain/events/store.deleted.event';
import { WarehouseRepository } from '../../../domain/repositories/warehouse/warehouse.repository';
import { WarehouseInfrastructure } from '../../../infrastructure/warehouse.infrastructure';

@EventsHandler(StoreDeletedEvent)
export class StoreDeletedEventHandler implements IEventHandler<StoreDeletedEvent>
{
    constructor(@Inject(WarehouseInfrastructure) private warehouseRepository: WarehouseRepository) { }

    public async handle(event: StoreDeletedEvent) {
        console.log('SessionDeletedEvent', event);
        const warehouseResult = await this.warehouseRepository.findById(event.warehouseId.props.value);

        if (warehouseResult.isErr()) {
            throw new InternalServerErrorException(
                warehouseResult.error.message,
                warehouseResult.error.name,
            );
        }

        const warehouse = warehouseResult.value;
        const totalMilkBags = warehouse.properties().totalMilkBags + event.noBagMilksToSale;
        const noBranchesSubscribed = --warehouse.properties().noBranchesSubscribed;

        warehouse.update({ totalMilkBags, noBranchesSubscribed });

        const updateResult = await this.warehouseRepository.save(warehouse);
        if (updateResult.isErr()) {
            throw new InternalServerErrorException(
                updateResult.error.message,
                updateResult.error.name,
            );
        }
    }
}
