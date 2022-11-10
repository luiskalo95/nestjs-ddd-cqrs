
import { InfrastructureExceptionCode, InfrastructurException } from '../../../../../../core/exceptions/infrastructure/infrastructure.exception';

export class StoreCreatedDatabaseException extends InfrastructurException {
    constructor(message: string){
        super(StoreCreatedDatabaseException.getMessage(message));
        this.name = InfrastructureExceptionCode.SAVE_STORE_DATABASE_EXCEPTION;
    }

    public static getMessage(message: string): string {
        return `StoreCreateDatabaseException: ${message}`;
    }
}