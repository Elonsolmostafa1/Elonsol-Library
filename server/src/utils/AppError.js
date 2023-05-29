export class AppError extends Error {

    constructor(message,statusCode)
    {
        super(message)
        this.status = statusCode
    }

}