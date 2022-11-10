import { InfrastructureExceptionCode, InfrastructurException } from "src/core/exceptions/infrastructure/infrastructure.exception";


export class StoreListDatabaseException extends InfrastructurException {
    constructor(message: string){
        super(StoreListDatabaseException.getMessage(message));
        this.name = InfrastructureExceptionCode.LIST_STORE_DATABASE_EXCEPTION;
    }

    public static getMessage(message: string): string {
        return `StoreListDatabaseException: ${message}`;
    }
}