import connection_mysql from "../config/db_connection.js"

export const addUser = (data) => {
   return new Promise((resolve, reject) => {
      const sql = "INSERT INTO users SET ?"
      connection_mysql.query(sql, data, (err, rows) => {
         if (err) {
            reject(err)
            return
         }

         resolve(rows)
      })
   })
}

export const isEmailUnique = (email) => {
   return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE email = ?"
      connection_mysql.query(sql, email, (err, rows) => {
         if (err) {
            reject(err)
            return
         }

         // @ts-ignore
         resolve(rows.length === 0)
      })

   })
}