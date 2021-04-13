const formatServerError = function (err){
    return [{
        status: "500",
        title: "Internal Server Error",
        description: err.message || "Please check the logs"
    }]
}

const formatValidationError = function(errors){
    return Object.values(errors).map(e => ({
        status: "400",
        title: "Validation error",
        detail: e.message,
        source: {pointer: `/data/attributes/${e.path}` , value: e.value}
    }))
}

export default(err, req , res , next)=>{
    const isValidatorError = err?.name === "ValidationError" 
    const code = isValidatorError ? 400 : err.code || 500

    let payload =[err]

    if(code === 400) payload = formatValidationError(err)
    
    if(code === 500)payload = formatServerError(err)
    

    res.status(code).send({errors:  payload})
}