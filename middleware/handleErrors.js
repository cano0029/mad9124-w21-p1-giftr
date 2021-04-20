const formatServerError = function (error) {
    return [
        {
            status: '500',
            title: 'Internal Server Error',
            detail: error.message || 'Please check the logs',
            source: { pointer: `/data/attributes/${error.path}` },
        },
    ]
}

const formatValidationError = function (error) {
    return Object.values(error).map((err) => ({
        status: 'Bad Request',
        code: '400',
        title: 'Validation error',
        detail: err.message,
        source: { pointer: `/data/attributes/${err.path}` },
    }))
}

export default function handleErrors(err, req, res, next) {
    const isValidatorError = err?.name === 'ValidationError'
    const code = isValidatorError ? 400 : err.code || 500

    let payload

    if (code === 400) {
        payload = formatValidationError(err.errors)
    } else if (code === 500) {
        payload = formatServerError(err)
    }

    res.status(code).send({ errors: payload })
}
