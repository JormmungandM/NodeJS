import validator from "../features/validator.js"
import { isEmailUnique } from "../models/user.js"

export const isNameValid = (req, res, next) => {

   const name = req.body.name

   if (!name) {
      req.body.validationErrors.push("User name required as field 'name'")
   }

   next()
}

export const isEmailValid = async (req, res, next) => {

   const email = req.body.email

   if (!email) {
      req.body.validationErrors.push("Email required as field 'email'")
   }
   else if (!validator.isEmail(email)) {
      req.body.validationErrors.push("Email is not valid")
   }

   if (email) {
      const isUnique = await isEmailUnique(email)
      if (!isUnique) {
         req.body.validationErrors.push("This email is already used")
      }
   }

   next()
}

export const isPasswordValid = (req, res, next) => {

   const password = req.body.password
   const passwordRepeat = req.body.password_repeat

   if (!password) {
      req.body.validationErrors.push({
         field: "password",
         message: "Password required as field 'password'"
      })
   }

   if (!passwordRepeat) {
      req.body.validationErrors.push({
         field: "password_repeat",
         message: "Password repeat required as field 'password_repeat'"
      })
   }

   if (password && passwordRepeat && password !== passwordRepeat) {
      req.body.validationErrors.push({
         field: "password_repeat",
         message: "Password mismatch"
      })
   }

   next()
}