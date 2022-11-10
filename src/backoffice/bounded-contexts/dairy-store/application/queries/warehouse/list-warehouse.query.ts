import { Inject, InternalServerErrorException } from "@nestjs/common";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { WarehouseInfrastructure } from '../../../infrastructure/warehouse.infrastructure';
import { WarehouseRepository } from '../../../domain/repositories/warehouse/warehouse.repository';
import { WarehouseListResponse } from '../../dtos/warehouse/warehouse-listed-response.dto';

export class ListWarehousesQuery implements IQuery {

    constructor(public readonly status: boolean) { }
}

@QueryHandler(ListWarehousesQuery)
export class ListWarehouseQueryHandler implements IQueryHandler<ListWarehousesQuery, WarehouseListResponse> {

    constructor(@Inject(WarehouseInfrastructure) private warehouseRepository: WarehouseRepository) { }

    public async execute(query: ListWarehousesQuery): Promise<WarehouseListResponse> {
        const { status } = query;
        const warehouseListResult = await this.warehouseRepository.list(status);
        if (warehouseListResult.isErr()) {
            throw new InternalServerErrorException(
                warehouseListResult.error.message,
                warehouseListResult.error.name,
            )
        }
        return WarehouseListResponse.fromDomainToResponse((warehouseListResult.value));

    }
}
