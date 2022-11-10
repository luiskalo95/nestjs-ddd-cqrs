import { DomainException, DomainExceptionCode } from 'src/core/exceptions/domain/domain.exception';

export class WarehouseFixedPriceMilkNotValidException extends DomainException {

    constructor(){
        super(WarehouseFixedPriceMilkNotValidException.getMessage());
        this.name =  DomainExceptionCode.WAREHOUSE_FIXED_PRICE_MILK_NOT_VALID_EXCEPTION;
    }

    public static getMessage(){
        return 'Total milks has to be greater than 0 ';
    }
}