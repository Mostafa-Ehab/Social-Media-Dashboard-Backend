import { BaseException } from "./baseException";

class NotImplementedException extends BaseException {
    constructor(message: string = "Not implemented", errorCode: number = 501) {
        super(501, message, errorCode);
    }
}

export { NotImplementedException };
