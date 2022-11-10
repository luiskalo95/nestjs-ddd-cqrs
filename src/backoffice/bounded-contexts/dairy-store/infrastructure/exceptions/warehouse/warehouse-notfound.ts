import { InfrastructureExceptionCode, InfrastructurException } from 'src/core/exceptions/infrastructure/infrastructure.exception';

export class WarehouseNotFoundException extends InfrastructurException {
    constructor() {
      super(WarehouseNotFoundException.getMessage());
      this.name = InfrastructureExceptionCode.FIND_BY_ID_WAREHOUSE_NOT_FOUND_EXCEPTION;
    }
  
    static getMessage() {
      return `WarehouseNotFoundException: Not found warehouse`;
    }
  }