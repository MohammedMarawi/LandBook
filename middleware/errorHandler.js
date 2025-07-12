const sendErrorForDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorForProd = (err, res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });

    } else {
        console.error('ERROR', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
        });
    }
};


const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development'){
        sendErrorForDev(err, res);
    } else if (process.env.NODE_ENV === 'production'){
        sendErrorForProd(err, res);
    } 
    
};

module.exports = globalErrorHandler;
