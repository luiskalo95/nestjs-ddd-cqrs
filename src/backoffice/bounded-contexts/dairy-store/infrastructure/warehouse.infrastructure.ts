import { err, ok, Result } from "neverthrow";
import { AppService } from "src/app.service";
import { Warehouse } from "../domain/aggregates/warehouse/warehouse";
import { WarehouseRepository } from '../domain/repositories/warehouse/warehouse.repository';
import { WarehouseDTO } from "./dtos/warehouse/warehouse.dto";
import { WarehouseEntity } from './entities/warehouse/warehouse.entity';
import { WarehouseCreatedDatabaseException } from "./exceptions/warehouse/warehouse-create";
import { WarehouseListDatabaseException } from "./exceptions/warehouse/warehouse-list";
import { WarehouseFindByIdDatabaseException } from './exceptions/warehouse/warehouse-findbyid';
import { WarehouseNotFoundException } from './exceptions/warehouse/warehouse-notfound';

export type WarehouseCreatedResult = Result<Warehouse, WarehouseCreatedDatabaseException>
export type WarehouseListResult = Result<Warehouse[], WarehouseListDatabaseException>
export type WarehouseFindByIdResult = Result<Warehouse, WarehouseFindByIdDatabaseException | WarehouseNotFoundException>

export class WarehouseInfrastructure implements WarehouseRepository {

    public async save(warehouse: Warehouse): Promise<WarehouseCreatedResult> {
        try {
            const warehouseEntity = WarehouseDTO.fromDomainToData(warehouse);
            const warehouseSaved = await AppService.manager.getRepository(WarehouseEntity).save(warehouseEntity);
            return ok(WarehouseDTO.fromDataToDomainUnique(warehouseSaved));
        } catch (error) {
            console.log(error);
            return err(new WarehouseCreatedDatabaseException(error.sqlMessage));
        }
    }

    public async list(status: boolean): Promise<WarehouseListResult> {
        try {
            const warehouses = await AppService.manager.getRepository(WarehouseEntity).find({ where: { status } });
            return ok(WarehouseDTO.fromDataToDomainList(warehouses));
        } catch (error) {
            console.log(error);
            return err(new WarehouseListDatabaseException(error.sqlMessage));
        }
    }

    public async findById(id: string): Promise<WarehouseFindByIdResult> {
        try {
            const warehouse = await AppService.manager.getRepository(WarehouseEntity).findOne({ where: { 'warehouseId': id } })
            if (!warehouse) return err(new WarehouseNotFoundException());
            return ok(WarehouseDTO.fromDataToDomainUnique(warehouse));
        } catch (error) {
            console.log(error);
            return err(new WarehouseFindByIdDatabaseException(error.sqlMessage));
        }
    }

}