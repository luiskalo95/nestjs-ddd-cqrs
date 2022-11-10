import { DomainException, DomainExceptionCode } from 'src/core/exceptions/domain/domain.exception';

export class WarehouseFixedPriceMilkEmptyException extends DomainException {

    constructor(){
        super(WarehouseFixedPriceMilkEmptyException.getMessage());
        this.name =  DomainExceptionCode.WAREHOUSE_TOTAL_MILKS_EMPTY_EXCEPTION;
    }

    public static getMessage(){
        return 'Fixed price milk can not be empty';
    }
}