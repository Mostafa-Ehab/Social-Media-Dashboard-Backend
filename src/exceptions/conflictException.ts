import { BaseException } from './baseException';

class ConflictException extends BaseException {
    constructor(message: string = 'Conflict', errorCode: number = 409) {
        super(409, message, errorCode);
    }
}

export { ConflictException };
