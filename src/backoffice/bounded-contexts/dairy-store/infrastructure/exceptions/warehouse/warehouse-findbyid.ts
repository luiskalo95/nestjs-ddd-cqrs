import { InfrastructurException, InfrastructureExceptionCode } from 'src/core/exceptions/infrastructure/infrastructure.exception';


export class WarehouseFindByIdDatabaseException extends InfrastructurException {
    constructor(message: string){
        super(WarehouseFindByIdDatabaseException.getMessage(message));
        this.name = InfrastructureExceptionCode.FIND_BY_ID_WAREHOUSE_DATABASE_EXCEPTION;
    }

    public static getMessage(message: string): string {
        return `WarehouseFindByIdDatabaseException: ${message}`;
    }
}