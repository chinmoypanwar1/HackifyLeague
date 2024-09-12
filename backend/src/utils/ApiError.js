class ApiError extends Error {

    constructor(
        statusCode,
        message = "Something Went Wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.data = null
        this.statusCode = statusCode
        this.message = message
        this.errors = errors

        if(stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.errors)
        }
    }

}

export {ApiError};