import { InfrastructureExceptionCode, InfrastructurException } from 'src/core/exceptions/infrastructure/infrastructure.exception';

export class StoreNotFoundException extends InfrastructurException {
    constructor() {
      super(StoreNotFoundException.getMessage());
      this.name = InfrastructureExceptionCode.FIND_BY_ID_STORE_NOT_FOUND_EXCEPTION;
    }
  
    static getMessage() {
      return `StoreNotFoundException: Not found store`;
    }
  }