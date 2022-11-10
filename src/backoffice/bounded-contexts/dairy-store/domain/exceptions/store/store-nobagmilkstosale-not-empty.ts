import { DomainException, DomainExceptionCode } from 'src/core/exceptions/domain/domain.exception';

export class StoreNoBagMilksToSaleEmptyException extends DomainException {

    constructor(){
        super(StoreNoBagMilksToSaleEmptyException.getMessage());
        this.name =  DomainExceptionCode.STORE_NOBAGMILKSTOSALE_EMPTY_EXCEPTION;
    }

    public static getMessage(){
        return 'NoBagMilksToSale milks can not be empty';
    }
}