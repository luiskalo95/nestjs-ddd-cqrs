import { BadRequestException, Inject, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { StoreDeleteResponse } from '../../dtos/store/store-deleted-response.dto';
import { StoreInfrastructure } from '../../../infrastructure/store.infrastructure';
import { StoreRepository } from '../../../domain/repositories/store/store.repository';
import { StoreVO } from '../../../domain/value-objects/store/store-id.vo';


export class DeleteStoreCommand implements ICommand {

    constructor(
        public readonly idStore: string
    ) { }
}

@CommandHandler(DeleteStoreCommand)
export class DeleteStoreCommandHandler implements ICommandHandler<DeleteStoreCommand, StoreDeleteResponse> {

    constructor(@Inject(StoreInfrastructure) private storeRepository: StoreRepository) { }

    public async execute(command: DeleteStoreCommand): Promise<StoreDeleteResponse> {

        const { idStore } = command;
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
        store.delete();
        const storeUpdatedResult = await this.storeRepository.save(store);
        store.commit();

        if (storeUpdatedResult.isErr()) {
            throw new InternalServerErrorException(
                storeUpdatedResult.error.message,
                storeUpdatedResult.error.name,
            )
        }
        return StoreDeleteResponse.fromDomainToResponse(storeUpdatedResult.value);

    }
}
