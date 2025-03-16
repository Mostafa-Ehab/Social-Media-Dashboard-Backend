import { BaseException } from './baseException';

class NotFoundException extends BaseException {
    constructor(message: string = 'Content not found', errorCode: number = 404) {
        super(404, message, errorCode);
    }
}

export { NotFoundException };
