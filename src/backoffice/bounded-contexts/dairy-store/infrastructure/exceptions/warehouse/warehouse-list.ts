import { InfrastructureExceptionCode, InfrastructurException } from "src/core/exceptions/infrastructure/infrastructure.exception";


export class WarehouseListDatabaseException extends InfrastructurException {
    constructor(message: string){
        super(WarehouseListDatabaseException.getMessage(message));
        this.name = InfrastructureExceptionCode.LIST_WAREHOUSE_DATABASE_EXCEPTION;
    }

    public static getMessage(message: string): string {
        return `WarehouseListDatabaseException: ${message}`;
    }
}