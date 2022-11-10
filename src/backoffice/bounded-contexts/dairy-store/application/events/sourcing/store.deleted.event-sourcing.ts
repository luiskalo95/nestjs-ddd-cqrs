import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { EventSourcingRepository } from '../../../domain/repositories/event-sourcing.repository';
import { EventSourcingInfrastructure } from '../../../infrastructure/event-sourcing.infrastructure';
import { StoreDeletedEvent } from '../../../domain/events/store.deleted.event';
import { EventSourcing } from '../../../infrastructure/entities/event-sourcing';

@EventsHandler(StoreDeletedEvent)
export class EventSourcingStoreDeleteHandler implements IEventHandler<StoreDeletedEvent>{

    constructor(@Inject(EventSourcingInfrastructure) private readonly repository: EventSourcingRepository) { }

    public async handle(event: StoreDeletedEvent) {
        console.log('EventSourcingStoreDeletedHandler', event);
        const evtSourcing = new EventSourcing(event.storeId.value,'Store','Deleted',{},);
        await this.repository.save(evtSourcing);
    }
}
