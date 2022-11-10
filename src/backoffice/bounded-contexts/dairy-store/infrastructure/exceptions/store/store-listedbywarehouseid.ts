import { InfrastructureExceptionCode, InfrastructurException } from "src/core/exceptions/infrastructure/infrastructure.exception";


export class StoreListByWarehouseIdDatabaseException extends InfrastructurException {
    constructor(message: string){
        super(StoreListByWarehouseIdDatabaseException.getMessage(message));
        this.name = InfrastructureExceptionCode.LIST_BY_WAREHOUSEID_STORE_DATABASE_EXCEPTION;
    }

    public static getMessage(message: string): string {
        return `StoreListByWarehouseIdDatabaseException: ${message}`;
    }
}