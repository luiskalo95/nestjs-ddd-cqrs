import { BadRequestException, Inject, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { WarehouseVO } from "../../../domain/value-objects/warehouse/warehouse-id.vo";
import { WarehouseCreateResponse } from '../../dtos/warehouse/warehouse-created-response.dto';
import { WarehouseInfrastructure } from '../../../infrastructure/warehouse.infrastructure';
import { WarehouseRepository } from '../../../domain/repositories/warehouse/warehouse.repository';
import { WarehouseDeleteResponse } from "../../dtos/warehouse/warehouse-deleted-response.dto";


export class DeleteWarehouseCommand implements ICommand {

    constructor(
        public readonly idWarehouse: string
    ) { }
}

@CommandHandler(DeleteWarehouseCommand)
export class DeleteWarehouseCommandHandler implements ICommandHandler<DeleteWarehouseCommand, WarehouseDeleteResponse> {

    constructor(@Inject(WarehouseInfrastructure) private warehouseRepository: WarehouseRepository) { }

    public async execute(command: DeleteWarehouseCommand): Promise<WarehouseCreateResponse> {

        const { idWarehouse } = command;
        const warehouseIdResult = WarehouseVO.create(idWarehouse);
        if (warehouseIdResult.isErr()) {
            throw new BadRequestException(
                warehouseIdResult.error.message,
                warehouseIdResult.error.name
            );
        }
        const warehouseFoundResult = await this.warehouseRepository.findById(idWarehouse);
        if (warehouseFoundResult.isErr()) {
            throw new InternalServerErrorException(
                warehouseFoundResult.error.message,
                warehouseFoundResult.error.name,
            )
        }

        const warehouse = warehouseFoundResult.value;
        warehouse.delete();
        const warehouseUpdatedResult = await this.warehouseRepository.save(warehouse);

        if (warehouseUpdatedResult.isErr()) {
            throw new InternalServerErrorException(
                warehouseUpdatedResult.error.message,
                warehouseUpdatedResult.error.name,
            )
        }
        return WarehouseDeleteResponse.fromDomainToResponse(warehouseUpdatedResult.value);

    }
}
