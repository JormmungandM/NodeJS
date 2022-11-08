import { Router } from "express"
import { addUserMiddleware } from "../controllers/user_controller.js"
import { isEmailValid, isNameValid, isPasswordValid } from "../features/userValidation.js"
import addValidatorMiddleware from "../features/validator.js"

const router = Router()

router.route("/user")
   .post(
      addValidatorMiddleware,
      isNameValid,
      isEmailValid,
      isPasswordValid,
      addUserMiddleware,
      (req, res) => {
         if (req.body.validationErrors) {
            if (req.body.validationErrors.length !== 0) {
               return res.json({
                  error: true,
                  message: req.body.validationErrors
               })
            }
         }

         return res.json({
            error: false,
            message: "User added successfully"
         })
      })

export default router