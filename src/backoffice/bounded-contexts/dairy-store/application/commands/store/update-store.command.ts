import { BadRequestException, Inject, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { StoreInfrastructure } from '../../../infrastructure/store.infrastructure';
import { StoreUpdateResponse } from '../../dtos/store/store-updated-response.dto';
import { StoreVO } from '../../../domain/value-objects/store/store-id.vo';
import { StoreRepository } from "../../../domain/repositories/store/store.repository";
import { StoreUpdate } from '../../../domain/aggregates/store/store';

export class UpdateStoreCommand implements ICommand {

    constructor(
        public readonly name: string,
        public readonly status: boolean,
        public readonly neighborhood: string,
        public readonly noBagMilksToSale: number,
        public readonly percentValuePerMilkBag: number,
        public readonly idStore: string
    ) { }
}

@CommandHandler(UpdateStoreCommand)
export class UpdateStoreCommandHandler implements ICommandHandler<UpdateStoreCommand, StoreUpdateResponse> {

    constructor(@Inject(StoreInfrastructure) private storeRepository: StoreRepository) { }

    public async execute(command: UpdateStoreCommand): Promise<StoreUpdateResponse> {

        const { name, status, neighborhood, noBagMilksToSale, percentValuePerMilkBag, idStore } = command;
        const storeIdResult = StoreVO.create(idStore);
        if (storeIdResult.isErr()) {
            throw new BadRequestException(
                storeIdResult.error.message,
                storeIdResult.error.name
            );
        }
        const storeFoundResult = await this.storeRepository.findById(idStore);
        if (storeFoundResult.isErr()) {
            throw new InternalServerErrorException(
                storeFoundResult.error.message,
                storeFoundResult.error.name,
            )
        }

        const store = storeFoundResult.value;
        const storeToUpdate: StoreUpdate = {
            ...storeFoundResult.value,
            name: name || store.properties().name,
            status: status || store.properties().status,
            neighborhood: neighborhood || store.properties().neighborhood,
            noBagMilksToSale: noBagMilksToSale || store.properties().noBagMilksToSale,
            percentValuePerMilkBag: percentValuePerMilkBag || store.properties().percentValuePerMilkBag,
        }
        store.update(storeToUpdate);
        const storeUpdatedResult = await this.storeRepository.save(store);
        store.commit();

        if (storeUpdatedResult.isErr()) {
            throw new InternalServerErrorException(
                storeUpdatedResult.error.message,
                storeUpdatedResult.error.name,
            )
        }
        return StoreUpdateResponse.fromDomainToResponse(storeUpdatedResult.value);

    }
}
