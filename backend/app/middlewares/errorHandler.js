module.exports = function handleError(err, _req, res, _next) {
    var output = {
        error: {
            name: err.name,
            message: err.message,
            text: err.toString()
        }
    }
    var statusCode = err.status || 500
    res.status(statusCode).json(output)
}