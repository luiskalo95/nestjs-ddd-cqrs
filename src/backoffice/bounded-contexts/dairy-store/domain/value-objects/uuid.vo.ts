import { err, Result, ok } from 'neverthrow';
import { ValueObject } from './value-object';
import { validate as uuidValidate } from 'uuid';
import { UuidIdInvalidException } from '../exceptions/uuid-id';

interface UuidProps {
    value: string;
}

export type uuidIdResult = Result<UuidVO, UuidIdInvalidException>;

export class UuidVO extends ValueObject<UuidProps> {

    private constructor(props: UuidProps) {
        super(props);
    }

    public static create(uuid: string): uuidIdResult {
        if (!uuidValidate(uuid)) return err(new UuidIdInvalidException());
        return ok(new UuidVO({ value: uuid }));
    }

    public get value() {
        return this.props.value;
    }
}