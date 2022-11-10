
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { EventSourcingRepository } from '../../../domain/repositories/event-sourcing.repository';
import { EventSourcingInfrastructure } from '../../../infrastructure/event-sourcing.infrastructure';
import { StoreUpdatedEvent } from '../../../domain/events/store.updated.event';
import { EventSourcing } from '../../../infrastructure/entities/event-sourcing';

@EventsHandler(StoreUpdatedEvent)
export class EventSourcingStoreUpdateHandler implements IEventHandler<StoreUpdatedEvent>{

    constructor(@Inject(EventSourcingInfrastructure) private readonly repository: EventSourcingRepository,) { }

    public async handle(event: StoreUpdatedEvent) {
        console.log('EventSourcingStoreUpdatedHandler', event);
        const evtSourcing = new EventSourcing(event.storeId.value,'Store','Updated',{    ...event,    storeId: event.storeId.value,warehouseId: event.warehouseId.value,});
        await this.repository.save(evtSourcing);
    }
}
