import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateStoreDTO } from './dtos/store/create-store.dto';
import { CreateStoreCommand } from '../application/commands/store/create-store.command';
import { ListStoresQuery } from "../application/queries/store/list-store.query";
import { UpdateStoreDTO } from './dtos/store/update-store.dto';
import { UpdateStoreCommand } from '../application/commands/store/update-store.command';
import { DeleteStoreCommand } from '../application/commands/store/delete-store.command';

@Controller('store')
export class StoreController {

    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Post()
    public async create(@Body() body: CreateStoreDTO) {
        const { name, warehouseAssociatedID, neighborhood, noBagMilksToSale } = body;
        const command = new CreateStoreCommand(name, warehouseAssociatedID, neighborhood, noBagMilksToSale);
        const response = await this.commandBus.execute(command);
        return response;
    }

    @Get()
    public async list() {
        const status = true;
        const query = new ListStoresQuery(status);
        const response = await this.queryBus.execute(query);
        return response;
    }

    @Put('/:id')
    public async update(@Body() properties: UpdateStoreDTO, @Param('id', ParseUUIDPipe) idStore: string) {
        const { name, status, neighborhood, noBagMilksToSale, percentValuePerMilkBag } = properties;
        const command = new UpdateStoreCommand(name, status, neighborhood, noBagMilksToSale, percentValuePerMilkBag, idStore);
        const response = await this.commandBus.execute(command);
        return response;
    }

    @Delete('/:id')
    public async delete(@Param('id', ParseUUIDPipe) idStore: string) {
        const command = new DeleteStoreCommand(idStore);
        const response = await this.commandBus.execute(command);
        return response;
    }
}