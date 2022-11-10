import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateWarehouseDTO } from "./dtos/warehouse/create-warehouse.dto";
import { CreateWarehouseCommand } from '../application/commands/warehouse/create-warehouse.command';
import { ListWarehousesQuery } from '../application/queries/warehouse/list-warehouse.query';
import { UpdateWarehouseDTO } from './dtos/warehouse/update-warehouse.dto';
import { UpdateWarehouseCommand } from '../application/commands/warehouse/update-warehouse.command';
import { DeleteWarehouseCommand } from '../application/commands/warehouse/delete-warehouse.command';

@Controller('warehouse')
export class WarehouseController {

    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Post()
    public async create(@Body() body: CreateWarehouseDTO) {
        const { name, city, totalMilkBags, fixedMilkPrice } = body;
        const command = new CreateWarehouseCommand(name, city, totalMilkBags, fixedMilkPrice);
        const response = await this.commandBus.execute(command);
        return response;
    }

    @Get()
    public async list() {
        const status = true;
        const query = new ListWarehousesQuery(status);
        const response = await this.queryBus.execute(query);
        return response;
    }

    @Put('/:id')
    public async update(@Body() properties: UpdateWarehouseDTO, @Param('id', ParseUUIDPipe) idWarehouse: string) {
        const { name, city, totalMilkBags, fixedMilkPrice, status, totalProfits, noBranchesSubscribed, demand } = properties;
        const command = new UpdateWarehouseCommand(name, city, totalMilkBags, fixedMilkPrice, totalProfits, status, noBranchesSubscribed, demand, idWarehouse);
        const response = await this.commandBus.execute(command);
        return response;
    }

    @Delete('/:id')
    public async delete(@Param('id', ParseUUIDPipe) idWarehouse: string) {
        const command = new DeleteWarehouseCommand(idWarehouse);
        const response = await this.commandBus.execute(command);
        return response;
    }
}