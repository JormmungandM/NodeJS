import connection_mysql from "../config/db_connection.js"


export const find_all = () => {
  return new Promise((resolve, reject) => {
    connection_mysql.query("SELECT * FROM cars_list", (err, rows) => {
      if (err) reject(err);
      else {
        resolve(rows);
      }
    });
  });
};

export const add_car = (data) => {
  return new Promise((resolve, reject) => {
    connection_mysql.query("INSERT INTO cars_list SET ?", data, (err, rows) => {
      if (err){
        console.log(err)
        reject(err);
      } 
      else {
        resolve(rows);
      }
    });
  });
};

export const edit_car = (data) => {
  return new Promise((resolve, reject) => {
    connection_mysql.query(
      "UPDATE cars_list SET ? WHERE id=?",
      [data, data.id], 
    (err, rows) => {
      if (err) {
        console.log(err)
        reject(err);
      }
      else {
        resolve(rows);
      }
    });
  });
};

//DELETE FROM `cars_list` WHERE `cars_list`.`id` = 0
export const delete_car = (data) => {
  return new Promise((resolve, reject) => {
    connection_mysql.query("DELETE FROM `cars_list` WHERE `cars_list`.`id` = ?", data, (err, rows) => {
      if (err) reject(err);
      else {
        resolve(rows);
      }
    });
  });
};