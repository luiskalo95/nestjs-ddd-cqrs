import { DomainException, DomainExceptionCode } from "src/core/exceptions/domain/domain.exception";

export class StoreNameEmptyException extends DomainException {

    constructor(){
        super(StoreNameEmptyException.getMessage());
        this.name =  DomainExceptionCode.STORE_NAME_EMPTY_EXCEPTION;
    }

    public static getMessage(){
        return 'Name can not be empty';
    }
}