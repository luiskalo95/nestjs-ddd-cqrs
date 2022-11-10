import { DomainException, DomainExceptionCode } from 'src/core/exceptions/domain/domain.exception';

export class WarehouseTotalMilksEmptyException extends DomainException {

    constructor(){
        super(WarehouseTotalMilksEmptyException.getMessage());
        this.name =  DomainExceptionCode.WAREHOUSE_TOTAL_MILKS_EMPTY_EXCEPTION;
    }

    public static getMessage(){
        return 'Total milks can not be empty';
    }
}