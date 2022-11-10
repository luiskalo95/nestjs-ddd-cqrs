import { DomainException, DomainExceptionCode } from "src/core/exceptions/domain/domain.exception";

export class UuidIdInvalidException extends DomainException {

    constructor() {
        super(UuidIdInvalidException.getMessage());
        this.name = DomainExceptionCode.UUID_ID_INVALID;
    }

    public static getMessage(): string {
        return 'UuidId must be a valid UUID';
    }
}