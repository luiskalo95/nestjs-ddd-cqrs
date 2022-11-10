import { err, ok, Result } from 'neverthrow';
import { validate as uuidValidate } from 'uuid';
import { StoreIdInvalidException } from '../../exceptions/store/store-id';

import { ValueObject } from '../value-object';

interface ScheduleProps {
    value: string;
}

export type storeIdResult = Result<StoreVO, StoreIdInvalidException>;

export class StoreVO extends ValueObject<ScheduleProps> {

    private constructor(props: ScheduleProps) {
        super(props);
    }

    public static create(uuid: string): storeIdResult {
        if (!uuidValidate(uuid)) return err(new StoreIdInvalidException());
        return ok(new StoreVO({ value: uuid }));
    }

    get value() {
        return this.props.value;
    }
}
