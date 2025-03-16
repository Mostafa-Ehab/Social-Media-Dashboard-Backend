class BaseException extends Error {
    statusCode: number;
    errorCode: number

    constructor(statusCode: number = 500, message: string = 'Internal server error', errorCode: number = statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }
}

export { BaseException };
