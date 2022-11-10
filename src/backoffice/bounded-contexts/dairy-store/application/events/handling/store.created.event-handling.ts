import { Inject, InternalServerErrorException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StoreCreatedEvent } from '../../../domain/events/store.created.event';
import { WarehouseRepository } from '../../../domain/repositories/warehouse/warehouse.repository';
import { WarehouseInfrastructure } from '../../../infrastructure/warehouse.infrastructure';

@EventsHandler(StoreCreatedEvent)
export class StoreCreateEventHandler implements IEventHandler<StoreCreatedEvent>
{
    constructor(@Inject(WarehouseInfrastructure) private warehouseRepository: WarehouseRepository) { }

    public async handle(event: StoreCreatedEvent) {
        console.log('SessionCreatedEvent', event);
        const warehouseResult = await this.warehouseRepository.findById(event.warehouseId.value);

        if (warehouseResult.isErr()) {
            throw new InternalServerErrorException(
                warehouseResult.error.message,
                warehouseResult.error.name,
            );
        }

        const warehouse = warehouseResult.value;
        const totalMilkBags = warehouse.properties().totalMilkBags - event.noBagMilksToSale;
        const noBranchesSubscribed = ++warehouse.properties().noBranchesSubscribed;
        let demand = warehouse.properties().demand;

        if (totalMilkBags < 10) {
            demand = 'LOW';
        }

        if (totalMilkBags < 0) {
            throw new InternalServerErrorException(
                'Cannot request this amount of milk bags can not be negative',
                'StoreCreatedEvent',
            );
        }
        if (noBranchesSubscribed < 0) {
            throw new InternalServerErrorException(
                'The number of branches can not be negative',
                'StoreCreatedEvent',
            );
        }
        warehouse.update({ totalMilkBags, noBranchesSubscribed, demand });

        const updatedResult = await this.warehouseRepository.save(warehouse);
        if (updatedResult.isErr()) {
            throw new InternalServerErrorException(
                updatedResult.error.message,
                updatedResult.error.name,
            );
        }
    }
}
