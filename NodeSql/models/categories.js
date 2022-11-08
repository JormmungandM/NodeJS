import  connection_mysql  from "../config/db_connection.js";

//get all news
export const find_all = () => {
    return new Promise((resolve, reject) => {
      connection_mysql.query("SELECT * FROM list_of_categories_with_news", (err, rows) => {
        if (err) reject(err);
        else {
          resolve(rows);
        }
      });
    });
  };

  //insert news
export const create_categories = (data) => {
    return new Promise((resolve, reject) => {
      connection_mysql.query("INSERT INTO list_of_categories_with_news SET ?", data, (err, rows) => {
        if (err) reject(err);
        else {
          resolve(rows);
        }
      });
    });
  };
  
  //delete all news
  export const delete_categories = () => {
    return new Promise((resolve, reject) => {
      connection_mysql.query("TRUNCATE TABLE categories", (err, rows) => {
        if (err) reject(err);
        else {
          resolve(rows);
        }
      });
    });
  };
  