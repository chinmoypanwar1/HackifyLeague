class ApiResponse {
    constructor(
        statusCode,
        message = "Success",
        data
    ) {
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.success = success < 400
    }
}

export {ApiResponse}