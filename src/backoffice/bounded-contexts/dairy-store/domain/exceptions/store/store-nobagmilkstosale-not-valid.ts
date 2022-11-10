import { DomainException, DomainExceptionCode } from 'src/core/exceptions/domain/domain.exception';

export class StoreNoBagMilksToSaleNotValidException extends DomainException {

    constructor(){
        super(StoreNoBagMilksToSaleNotValidException.getMessage());
        this.name =  DomainExceptionCode.STORE_NOBAGMILKSTOSALE_NOT_VALID_EXCEPTION;
    }

    public static getMessage(){
        return 'No bag milks to sale has to be greater than 0 ';
    }
}