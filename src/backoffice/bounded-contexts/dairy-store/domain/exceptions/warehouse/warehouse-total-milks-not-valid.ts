import { DomainException, DomainExceptionCode } from 'src/core/exceptions/domain/domain.exception';

export class WarehouseTotalMilksNotValidException extends DomainException {

    constructor(){
        super(WarehouseTotalMilksNotValidException.getMessage());
        this.name =  DomainExceptionCode.WAREHOUSE_TOTAL_MILKS_NOT_VALID_EXCEPTION;
    }

    public static getMessage(){
        return 'Total milks has to be greater than 0 ';
    }
}