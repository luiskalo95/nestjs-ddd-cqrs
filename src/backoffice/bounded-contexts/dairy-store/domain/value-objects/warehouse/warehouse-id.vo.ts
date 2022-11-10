import { err, ok, Result } from 'neverthrow';
import { validate as uuidValidate } from 'uuid';

import { ValueObject } from '../value-object';
import { WarehouseIdInvalidException } from '../../exceptions/warehouse/warehouse-id';

interface ScheduleProps {
    value: string;
}

export type warehouseIdResult = Result<WarehouseVO, WarehouseIdInvalidException>;

export class WarehouseVO extends ValueObject<ScheduleProps> {

    private constructor(props: ScheduleProps) {
        super(props);
    }

    public static create(uuid: string): warehouseIdResult {
        if (!uuidValidate(uuid)) return err(new WarehouseIdInvalidException());
        return ok(new WarehouseVO({ value: uuid }));
    }

    get value() {
        return this.props.value;
    }
}
