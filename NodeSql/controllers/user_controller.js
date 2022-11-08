import { addUser } from "../models/user.js"
import bcrypt from "bcryptjs"

export const addUserMiddleware = async (req, res, next) => {

   if (req.body.validationErrors.length === 0) {
      const { name, email, password } = req.body

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const toAdd = {
         name,
         email,
         salt,
         id_role: 2,
         password: hash
      }
      try {
         const data = await addUser(toAdd)
      }
      catch (ex) {
         return res.json({
            error: true,
            message: "Something gone wrong"
         })
      }

   }

   next()
}