import { BadRequestException, Inject, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { v4 as uuidv4 } from 'uuid';
import { WarehouseVO } from "../../../domain/value-objects/warehouse/warehouse-id.vo";
import { WarehouseFactory } from '../../../domain/aggregates/warehouse/warehouse.factory';
import { WarehouseCreateResponse } from '../../dtos/warehouse/warehouse-created-response.dto';
import { WarehouseInfrastructure } from '../../../infrastructure/warehouse.infrastructure';
import { WarehouseRepository } from '../../../domain/repositories/warehouse/warehouse.repository';


export class CreateWarehouseCommand implements ICommand {

    constructor(
        public readonly name: string,
        public readonly city: string,
        public readonly totalMilkBags: number,
        public readonly fixedMilkPrice: number
    ) { }
}

@CommandHandler(CreateWarehouseCommand)
export class CreateWarehouseCommandHandler implements ICommandHandler<CreateWarehouseCommand, WarehouseCreateResponse> {

    constructor(@Inject(WarehouseInfrastructure) private warehouseRepository: WarehouseRepository) { }

    public async execute(command: CreateWarehouseCommand): Promise<WarehouseCreateResponse> {

        const { name, city, totalMilkBags, fixedMilkPrice } = command;
        const warehouseIdResult = WarehouseVO.create(uuidv4());
        if (warehouseIdResult.isErr()) {
            throw new InternalServerErrorException(
                warehouseIdResult.error.message,
                warehouseIdResult.error.name
            );
        }
        const warehouseId = warehouseIdResult.value;
        const warehouseResult = new WarehouseFactory().create(
            warehouseId,
            name,
            city,
            totalMilkBags,
            fixedMilkPrice
        );
        if (warehouseResult.isErr()) {
            throw new BadRequestException(
                warehouseResult.error.message,
                warehouseResult.error.name
            );
        }
        const warehouseCreatedResult = await this.warehouseRepository.save(warehouseResult.value);

        if (warehouseCreatedResult.isErr()) {
            throw new InternalServerErrorException(
                warehouseCreatedResult.error.message,
                warehouseCreatedResult.error.name,
            )
        }
        return WarehouseCreateResponse.fromDomainToResponse(warehouseCreatedResult.value);

    }
}
