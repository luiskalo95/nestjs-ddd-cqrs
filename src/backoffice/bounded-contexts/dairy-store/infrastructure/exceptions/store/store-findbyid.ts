import { InfrastructurException, InfrastructureExceptionCode } from 'src/core/exceptions/infrastructure/infrastructure.exception';


export class StoreFindByIdDatabaseException extends InfrastructurException {
    constructor(message: string){
        super(StoreFindByIdDatabaseException.getMessage(message));
        this.name = InfrastructureExceptionCode.FIND_BY_ID_STORE_DATABASE_EXCEPTION;
    }

    public static getMessage(message: string): string {
        return `StoreFindByIdDatabaseException: ${message}`;
    }
}