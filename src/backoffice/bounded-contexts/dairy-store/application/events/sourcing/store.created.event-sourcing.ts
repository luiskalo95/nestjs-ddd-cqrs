import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StoreCreatedEvent } from '../../../domain/events/store.created.event';
import { EventSourcingInfrastructure } from '../../../infrastructure/event-sourcing.infrastructure';
import { EventSourcingRepository } from '../../../domain/repositories/event-sourcing.repository';
import { EventSourcing } from '../../../infrastructure/entities/event-sourcing';

@EventsHandler(StoreCreatedEvent)
export class EventSourcingStoreCreateHandler implements IEventHandler<StoreCreatedEvent> {

    constructor(@Inject(EventSourcingInfrastructure) private readonly repository: EventSourcingRepository) { }

    public async handle(event: StoreCreatedEvent) {
        console.log('EventSourcingStoreCreateHandler', event);
        const evtSourcing = new EventSourcing(event.storeId.value, 'Store', 'Created', { ...event, storeId: event.storeId.value, warehouseId: event.warehouseId.value, });
        await this.repository.save(evtSourcing);
    }
}
