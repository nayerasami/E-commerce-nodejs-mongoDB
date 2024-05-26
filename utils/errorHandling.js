



const globalErrorHandling = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"
    if (process.env.NODE_ENV === 'development') {
        sendErrorForDev(err, res)
    } else {
        sendErrorForProduction(err, res)
    }

}

const sendErrorForDev = (err, res) => {
    return res.status(err.statusCode).json({
        message: err.message,
        status: err.status,
        error: err,
        stack: err.stack

    })
}

const sendErrorForProduction = (err, res) => {
    return res.status(err.statusCode).json({
        message: err.message,
        status: err.status,

    })
}

module.exports = globalErrorHandling