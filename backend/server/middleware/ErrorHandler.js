module.exports.NotFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`)
    res.status(404);
    next(error)
}

module.exports.ErrorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 :
        res.statusCode;
    res.status(statusCode);
    res.json({
        success: false,
        message: error.message,
        stack: error.stack
    })
}