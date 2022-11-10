import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { WarehouseController } from './backoffice/bounded-contexts/dairy-store/interfaces/warehouse.controller';
import { WarehouseFactory } from './backoffice/bounded-contexts/dairy-store/domain/aggregates/warehouse/warehouse.factory';
import { CreateWarehouseCommandHandler } from './backoffice/bounded-contexts/dairy-store/application/commands/warehouse/create-warehouse.command';
import { WarehouseInfrastructure } from './backoffice/bounded-contexts/dairy-store/infrastructure/warehouse.infrastructure';
import { ListWarehouseQueryHandler } from './backoffice/bounded-contexts/dairy-store/application/queries/warehouse/list-warehouse.query';
import { UpdateWarehouseCommandHandler } from './backoffice/bounded-contexts/dairy-store/application/commands/warehouse/update-warehouse.command';
import { DeleteWarehouseCommandHandler } from './backoffice/bounded-contexts/dairy-store/application/commands/warehouse/delete-warehouse.command';
import { StoreController } from './backoffice/bounded-contexts/dairy-store/interfaces/store.controller';
import { StoreFactory } from './backoffice/bounded-contexts/dairy-store/domain/aggregates/store/storefactory';
import { CreateStoreCommandHandler } from './backoffice/bounded-contexts/dairy-store/application/commands/store/create-store.command';
import { StoreInfrastructure } from './backoffice/bounded-contexts/dairy-store/infrastructure/store.infrastructure';
import { ListStoreQueryHandler } from './backoffice/bounded-contexts/dairy-store/application/queries/store/list-store.query';
import { UpdateStoreCommandHandler } from './backoffice/bounded-contexts/dairy-store/application/commands/store/update-store.command';
import { DeleteStoreCommandHandler } from './backoffice/bounded-contexts/dairy-store/application/commands/store/delete-store.command';
import { StoreCreateEventHandler } from './backoffice/bounded-contexts/dairy-store/application/events/handling/store.created.event-handling';
import { StoreDeletedEventHandler } from './backoffice/bounded-contexts/dairy-store/application/events/handling/store.deleted.event-handling';
import { StoreUpdatedHandler } from './backoffice/bounded-contexts/dairy-store/application/events/handling/store.updated.event-handling';
import { EventSourcingStoreCreateHandler } from './backoffice/bounded-contexts/dairy-store/application/events/sourcing/store.created.event-sourcing';
import { EventSourcingStoreDeleteHandler } from './backoffice/bounded-contexts/dairy-store/application/events/sourcing/store.deleted.event-sourcing';
import { EventSourcingStoreUpdateHandler } from './backoffice/bounded-contexts/dairy-store/application/events/sourcing/store.updated.event-sourcing';
import { EventSourcingInfrastructure } from './backoffice/bounded-contexts/dairy-store/infrastructure/event-sourcing.infrastructure';

const modules = [
  CqrsModule
];

const controllers = [
  WarehouseController,
  StoreController
];

const domain = [
  WarehouseFactory,
  StoreFactory
];

const applicationCommands = [
  CreateWarehouseCommandHandler,
  UpdateWarehouseCommandHandler,
  DeleteWarehouseCommandHandler,
  CreateStoreCommandHandler,
  UpdateStoreCommandHandler,
  DeleteStoreCommandHandler,
  StoreCreateEventHandler,
  StoreDeletedEventHandler,
  StoreUpdatedHandler,
  EventSourcingStoreCreateHandler,
  EventSourcingStoreDeleteHandler,
  EventSourcingStoreUpdateHandler
];
const applicationQueries = [
  ListWarehouseQueryHandler,
  ListStoreQueryHandler
];
const infrastructure = [
  WarehouseInfrastructure,
  StoreInfrastructure,
  EventSourcingInfrastructure
];

@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [AppService, ...domain, ...applicationCommands, ...applicationQueries, ...infrastructure],
})
export class AppModule { }