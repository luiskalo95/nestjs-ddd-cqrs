import { DomainException, DomainExceptionCode } from "src/core/exceptions/domain/domain.exception";

export class WarehouseNameEmptyException extends DomainException {

    constructor(){
        super(WarehouseNameEmptyException.getMessage());
        this.name =  DomainExceptionCode.WAREHOUSE_NAME_EMPTY_EXCEPTION;
    }

    public static getMessage(){
        return 'Name can not be empty';
    }
}