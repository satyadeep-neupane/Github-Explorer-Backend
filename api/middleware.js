exports.handleErrors = (err, _, res, __) => {
    res.status(err.status || 500).json({
        success: false,
        error: err.error || "Internal Server Error",
        message: err.message || "Something went wrong on the server.",
    });
};
