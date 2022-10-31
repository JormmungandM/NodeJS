import { connection_mysql } from "../config/db_connection.js";
//get all news
export const find_all = () => {
  return new Promise((resolve, reject) => {
    connection_mysql.query("SELECT * FROM list_news", (err, rows) => {
      if (err) reject(err);
      else {
        resolve(rows);
      }
    });
  });
};

//insert news
export const create_news = (data) => {
  return new Promise((resolve, reject) => {
    connection_mysql.query("INSERT INTO list_news SET ?", data, (err, rows) => {
      if (err) reject(err);
      else {
        resolve(rows);
      }
    });
  });
};

//delete all news
export const delete_news = () => {
  return new Promise((resolve, reject) => {
    connection_mysql.query("TRUNCATE TABLE list_news", (err, rows) => {
      if (err) reject(err);
      else {
        resolve(rows);
      }
    });
  });
};

export const find_one = (id) => {
  return new Promise((resolve, reject) => {
    connection_mysql.query(
      "SELECT * FROM list_news WHERE id=?",
      id,
      (err, rows) => {
        if (err) reject(err);
        else {
          resolve(rows);
        }
      }
    );
  });
};

export const update_one = (id, data) => {
  return new Promise((resolve, reject) => {
    connection_mysql.query(
      "UPDATE list_news SET ? WHERE id=?",
      [data, id],
      (err, rows) => {
        if (err) reject(err);
        else {
          resolve(rows);
        }
      }
    );
  });
};
