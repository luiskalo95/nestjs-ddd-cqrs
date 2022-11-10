import { DomainException, DomainExceptionCode } from "src/core/exceptions/domain/domain.exception";

export class StoreIdInvalidException extends DomainException {
  constructor() {
    super(StoreIdInvalidException.getMessage());
    this.name = DomainExceptionCode.STORE_ID_INVALID_EXCEPTION;
  }

  static getMessage() {
    return 'StoreId must be a valid UUID';
  }
}
