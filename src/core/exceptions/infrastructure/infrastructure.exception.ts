export enum InfrastructureExceptionCode {
    DEFAULT = 'INFRASTRUCTURE_EXCEPTION',
    SAVE_WAREHOUSE_DATABASE_EXCEPTION = 'SAVE_WAREHOUSE_DATABASE_EXCEPTION',
    LIST_WAREHOUSE_DATABASE_EXCEPTION = 'LIST_WAREHOUSE_DATABASE_EXCEPTION',
    FIND_BY_ID_WAREHOUSE_DATABASE_EXCEPTION = 'FIND_BY_ID_WAREHOUSE_DATABASE_EXCEPTION',
    FIND_BY_ID_WAREHOUSE_NOT_FOUND_EXCEPTION = 'FIND_BY_ID_WAREHOUSE_NOT_FOUND_EXCEPTION',
    SAVE_STORE_DATABASE_EXCEPTION = 'SAVE_STORE_DATABASE_EXCEPTION',
    LIST_STORE_DATABASE_EXCEPTION = 'LIST_STORE_DATABASE_EXCEPTION',
    FIND_BY_ID_STORE_DATABASE_EXCEPTION = 'FIND_BY_ID_STORE_DATABASE_EXCEPTION',
    FIND_BY_ID_STORE_NOT_FOUND_EXCEPTION = 'FIND_BY_ID_STORE_NOT_FOUND_EXCEPTION',
    LIST_BY_WAREHOUSEID_STORE_DATABASE_EXCEPTION = 'LIST_BY_WAREHOUSEID_STORE_DATABASE_EXCEPTION',
}

export class InfrastructurException extends Error {
    constructor(message?: string) {
        super(message);
        this.name = InfrastructureExceptionCode.DEFAULT;
    }
}