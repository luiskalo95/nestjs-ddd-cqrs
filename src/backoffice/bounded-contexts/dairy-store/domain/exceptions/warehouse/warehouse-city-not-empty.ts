import { DomainException, DomainExceptionCode } from 'src/core/exceptions/domain/domain.exception';

export class WarehouseCityEmptyException extends DomainException {

    constructor(){
        super(WarehouseCityEmptyException.getMessage());
        this.name =  DomainExceptionCode.WAREHOUSE_CITY_EMPTY_EXCEPTION;
    }

    public static getMessage(){
        return 'City can not be empty';
    }
}