import { HttpStatus } from '@nestjs/common';
import { Exception } from './exception';

export class AlreadyExistException extends Exception {

  getStatus = () => HttpStatus.CONFLICT;

  constructor(message?: string, domain?: string) {
    super(message || 'The element already exist', domain);
  }
}
