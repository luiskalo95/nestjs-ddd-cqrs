import { EventSourcing } from '../../infrastructure/entities/event-sourcing';

export interface EventSourcingRepository {
    save(event: EventSourcing): Promise<void>;
    list(): Promise<any[]>;
}
