import { HttpStatus } from '@nestjs/common';
import { Exception } from './exception';

export class DoesNotExistException extends Exception {

  getStatus = () => HttpStatus.CONFLICT;

  constructor(message?: string, domain?: string) {
    super(message || 'The element does not exist', domain);
  }
}
