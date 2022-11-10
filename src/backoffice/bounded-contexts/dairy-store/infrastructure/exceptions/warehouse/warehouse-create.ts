import { InfrastructureExceptionCode, InfrastructurException } from "src/core/exceptions/infrastructure/infrastructure.exception";


export class WarehouseCreatedDatabaseException extends InfrastructurException {
    constructor(message: string){
        super(WarehouseCreatedDatabaseException.getMessage(message));
        this.name = InfrastructureExceptionCode.SAVE_WAREHOUSE_DATABASE_EXCEPTION;
    }

    public static getMessage(message: string): string {
        return `WarehouseCreateDatabaseException: ${message}`;
    }
}