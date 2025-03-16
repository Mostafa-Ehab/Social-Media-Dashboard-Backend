import { BaseException } from './baseException';

class UnauthorizedException extends BaseException {
    constructor(message: string = 'Unauthorized', errorCode: number = 401) {
        super(401, message, errorCode);
    }
}

export { UnauthorizedException };
