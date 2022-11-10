import { BadRequestException, Inject, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { WarehouseVO } from "../../../domain/value-objects/warehouse/warehouse-id.vo";
import { WarehouseCreateResponse } from '../../dtos/warehouse/warehouse-created-response.dto';
import { WarehouseInfrastructure } from '../../../infrastructure/warehouse.infrastructure';
import { WarehouseRepository } from '../../../domain/repositories/warehouse/warehouse.repository';
import { WarehouseUpdateResponse } from '../../dtos/warehouse/warehouse-updated-response.dto';
import { WarehouseUpdate, DEMAND_TYPE } from '../../../domain/aggregates/warehouse/warehouse';


export class UpdateWarehouseCommand implements ICommand {

    constructor(
        public readonly name: string,
        public readonly city: string,
        public readonly totalMilkBags: number,
        public readonly fixedMilkPrice: number,
        public readonly totalProfits: number,
        public readonly status: boolean,
        public readonly noBranchesSubscribed: number,
        public readonly demand: DEMAND_TYPE,
        public readonly idWarehouse: string
    ) { }
}

@CommandHandler(UpdateWarehouseCommand)
export class UpdateWarehouseCommandHandler implements ICommandHandler<UpdateWarehouseCommand, WarehouseUpdateResponse> {

    constructor(@Inject(WarehouseInfrastructure) private warehouseRepository: WarehouseRepository) { }

    public async execute(command: UpdateWarehouseCommand): Promise<WarehouseCreateResponse> {

        const { name, city, totalMilkBags, fixedMilkPrice, status, idWarehouse, totalProfits, noBranchesSubscribed, demand } = command;
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
        const wareHouseToUpdate: WarehouseUpdate = {
            ...warehouseFoundResult.value,
            name: name || warehouse.properties().name,
            city: city || warehouse.properties().city,
            totalMilkBags: totalMilkBags || warehouse.properties().totalMilkBags,
            fixedMilkPrice: fixedMilkPrice || warehouse.properties().fixedMilkPrice,
            status: status || warehouse.properties().status,
            totalProfits: totalProfits || warehouse.properties().totalProfits,
            noBranchesSubscribed: noBranchesSubscribed || warehouse.properties().noBranchesSubscribed,
            demand: demand || warehouse.properties().demand
        }
        warehouse.update(wareHouseToUpdate);
        const warehouseUpdatedResult = await this.warehouseRepository.save(warehouse);

        if (warehouseUpdatedResult.isErr()) {
            throw new InternalServerErrorException(
                warehouseUpdatedResult.error.message,
                warehouseUpdatedResult.error.name,
            )
        }
        return WarehouseUpdateResponse.fromDomainToResponse(warehouseUpdatedResult.value);

    }
}
