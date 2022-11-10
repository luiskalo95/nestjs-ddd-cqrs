import { Inject, InternalServerErrorException } from "@nestjs/common";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { StoreRepository } from "../../../domain/repositories/store/store.repository";
import { StoreInfrastructure } from '../../../infrastructure/store.infrastructure';
import { StoreListResponse } from '../../dtos/store/store-listed-response.dto';

export class ListStoresQuery implements IQuery {

    constructor(public readonly status: boolean) { }
}

@QueryHandler(ListStoresQuery)
export class ListStoreQueryHandler implements IQueryHandler<ListStoresQuery, StoreListResponse> {

    constructor(@Inject(StoreInfrastructure) private storeRepository: StoreRepository) { }

    public async execute(query: ListStoresQuery): Promise<StoreListResponse> {
        const { status } = query;
        const warehouseListResult = await this.storeRepository.list(status);
        if (warehouseListResult.isErr()) {
            throw new InternalServerErrorException(
                warehouseListResult.error.message,
                warehouseListResult.error.name,
            )
        }
        return StoreListResponse.fromDomainToResponse((warehouseListResult.value));

    }
}
