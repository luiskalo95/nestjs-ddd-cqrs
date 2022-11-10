import { err, ok, Result } from "neverthrow";
import { Warehouse } from './warehouse';
import { WarehouseVO } from '../../value-objects/warehouse/warehouse-id.vo';
import { WarehouseNameEmptyException } from "../../exceptions/warehouse/warehouse-name-not-empty";
import { WarehouseCityEmptyException } from '../../exceptions/warehouse/warehouse-city-not-empty';
import { WarehouseTotalMilksEmptyException } from '../../exceptions/warehouse/warehouse-total-milks-not-empty';
import { WarehouseTotalMilksNotValidException } from '../../exceptions/warehouse/warehouse-total-milks-not-valid';
import { WarehouseFixedPriceMilkEmptyException } from '../../exceptions/warehouse/warehouse-fixed-price-milk-not-empty';
import { WarehouseFixedPriceMilkNotValidException } from '../../exceptions/warehouse/warehouse-fixed-price-milk-not-valid';

export type WarehouseFactoryResult = Result<Warehouse, | WarehouseNameEmptyException | WarehouseCityEmptyException | WarehouseTotalMilksEmptyException | WarehouseTotalMilksNotValidException | WarehouseFixedPriceMilkNotValidException>;

export class WarehouseFactory {

    public create(warehouseId: WarehouseVO, name: string, city: string, totalMilkBags: number, fixedMilkPrice: number): WarehouseFactoryResult {
        if (name.trim() === '') return err(new WarehouseNameEmptyException());
        if (city.trim() === '') return err(new WarehouseCityEmptyException());
        if (!totalMilkBags) return err(new WarehouseTotalMilksEmptyException());
        if (totalMilkBags <= 0) return err(new WarehouseTotalMilksNotValidException());
        if (!fixedMilkPrice) return err(new WarehouseFixedPriceMilkEmptyException());
        if (fixedMilkPrice <= 0) return err(new WarehouseFixedPriceMilkNotValidException());
        return ok(new Warehouse({ warehouseId, name, city, totalMilkBags, fixedMilkPrice }));
    }
}

