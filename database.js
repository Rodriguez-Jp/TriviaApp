import mysql from "mysql";
import { promisify } from "util";
import { databaseInfo } from "./keys.js";

const pool = mysql.createPool(databaseInfo.database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("DATABASE CONNECTION WAS CLOSED");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("DATABASE HAS TO MANY CONNECTIONS");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("DATABASE CONNECTION WAS REFUSED");
    }
  }

  if (connection) connection.release();
  console.log("DATABASE CONNECTED");
  return;
});

//Promisify pool queries
pool.query = promisify(pool.query);

export default pool;
