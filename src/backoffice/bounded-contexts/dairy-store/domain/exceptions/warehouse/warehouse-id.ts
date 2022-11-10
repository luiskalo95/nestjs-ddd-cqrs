import { DomainException, DomainExceptionCode } from "src/core/exceptions/domain/domain.exception";

export class WarehouseIdInvalidException extends DomainException {
  constructor() {
    super(WarehouseIdInvalidException.getMessage());
    this.name = DomainExceptionCode.WAREHOUSE_ID_INVALID_EXCEPTION;
  }

  static getMessage() {
    return 'WarehouseId must be a valid UUID';
  }
}
