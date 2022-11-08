
const addValidatorMiddleware = (req, res, next) => {
   req.body.validationErrors = []

   next()
}

export default addValidatorMiddleware