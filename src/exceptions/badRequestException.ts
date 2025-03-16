import { BaseException } from "./baseException";

class BadRequestException extends BaseException {
    constructor(message: string = 'BadRequestException', errorCode: number = 400) {
        super(400, message, errorCode);
    }
}

export { BadRequestException };