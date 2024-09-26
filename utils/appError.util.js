class appError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('5') ? 'fail' : 'error'
        Error.captureStackTrace(this, this.constructor)
    };
};

export default { appError };