import { BadRequestException, Inject, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { v4 as uuidv4 } from 'uuid';
import { WarehouseVO } from "../../../domain/value-objects/warehouse/warehouse-id.vo";
import { StoreRepository } from '../../../domain/repositories/store/store.repository';
import { StoreFactory } from "../../../domain/aggregates/store/storefactory";
import { StoreCreatedResponse } from '../../dtos/store/store-created-response.dto';
import { StoreVO } from '../../../domain/value-objects/store/store-id.vo';
import { StoreInfrastructure } from '../../../infrastructure/store.infrastructure';
import { WarehouseInfrastructure } from '../../../infrastructure/warehouse.infrastructure';
import { WarehouseRepository } from '../../../../../../../dist/backoffice/bounded-contexts/dairy-store/domain/repositories/warehouse/warehouse.repository';


export class CreateStoreCommand implements ICommand {

    constructor(
        public readonly name: string,
        public readonly warehouseAssociatedID: string,
        public readonly neighborhood: string,
        public readonly noBagMilksToSale: number
    ) { }
}

@CommandHandler(CreateStoreCommand)
export class CreateStoreCommandHandler implements ICommandHandler<CreateStoreCommand, StoreCreatedResponse> {

    constructor(@Inject(StoreInfrastructure) private storeRepository: StoreRepository, private readonly storeFactory: StoreFactory, @Inject(WarehouseInfrastructure) private warehouseRepository: WarehouseRepository) { }

    public async execute(command: CreateStoreCommand): Promise<StoreCreatedResponse> {

        const { name, warehouseAssociatedID, neighborhood, noBagMilksToSale } = command;
        const storeIdResult = StoreVO.create(uuidv4());
        if (storeIdResult.isErr()) {
            throw new InternalServerErrorException(
                storeIdResult.error.message,
                storeIdResult.error.name
            );
        }
        const warehouseIdResult = WarehouseVO.create(warehouseAssociatedID);
        if (warehouseIdResult.isErr()) {
            throw new InternalServerErrorException(
                warehouseIdResult.error.message,
                warehouseIdResult.error.name
            );
        }

        const warehouseFoundResult = await this.warehouseRepository.findById(warehouseAssociatedID);
        if (warehouseFoundResult.isErr()) {
            throw new NotFoundException(
                warehouseFoundResult.error.message,
                warehouseFoundResult.error.name,
            )
        }
        const warehouse = warehouseFoundResult.value;

        if (noBagMilksToSale > warehouse.properties().totalMilkBags)
            throw new BadRequestException(
                'The number of bags can not be greater than warehouse number of bags in the deposit',
                'CreateStoreCommand',
            )

        const storeId = storeIdResult.value;
        const warehouseId = warehouseIdResult.value;
        const storeResult = this.storeFactory.create(storeId, warehouseId, name, neighborhood, noBagMilksToSale);
        if (storeResult.isErr()) {
            throw new BadRequestException(
                storeResult.error.message,
                storeResult.error.name
            );
        }
        const storeCreatedResult = await this.storeRepository.save(storeResult.value);

        if (storeCreatedResult.isErr()) {
            throw new InternalServerErrorException(
                storeCreatedResult.error.message,
                storeCreatedResult.error.name,
            )
        }
        storeResult.value.commit();
        return StoreCreatedResponse.fromDomainToResponse(storeCreatedResult.value);

    }
}
