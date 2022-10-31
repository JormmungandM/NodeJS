import { connection_mysql } from "../config/db_connection.js";

export const create_user = (data) => {
  return new Promise((resolve, reject) => {
    connection_mysql.query("SELECT * FROM list_news", (err, rows) => {
      if (err) reject(err);
      else {
        resolve(rows);
      }
    });
  });
};