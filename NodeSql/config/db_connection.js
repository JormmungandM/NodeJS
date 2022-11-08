import mysql from "mysql2";
import config from "./config.js";
const connection_mysql = mysql.createConnection({
  host: config.DB.HOST,
  user: config.DB.USER,
  password: config.DB.PASSWORD,
  database: config.DB.DATABASE,
  port: config.DB.PORT,
});

export default connection_mysql;