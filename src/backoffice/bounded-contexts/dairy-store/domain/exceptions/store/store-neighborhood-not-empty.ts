import { DomainException, DomainExceptionCode } from 'src/core/exceptions/domain/domain.exception';

export class StoreNeighborhoodEmptyException extends DomainException {

    constructor(){
        super(StoreNeighborhoodEmptyException.getMessage());
        this.name =  DomainExceptionCode.STORE_NEIGHBORHOOD_EMPTY_EXCEPTION;
    }

    public static getMessage(){
        return 'Neighborhood can not be empty';
    }
}