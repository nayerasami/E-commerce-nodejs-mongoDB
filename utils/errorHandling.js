



const globalErrorHandling = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"
    res.status(err.statusCode).json({
        message: err.message,
        status: err.status,
        error: err,
        stack: err.stack

    })
}


module.exports = globalErrorHandling